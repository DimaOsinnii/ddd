import container from '@ioc/container';
import * as console from 'console';

type MigrationResult = [batch: number, migrations: string[]];

const COMMANDS = {
    MAKE: 'migrate:make',
    UP: 'migrate:up',
    DOWN: 'migrate:down',
    LIST: 'migrate:list',
    LATEST: 'migrate:latest',
    ROLLBACK: 'migrate:rollback',
    SEED_MAKE: 'seed:make',
    SEED_RUN: 'seed:run',
};

const knex = container.resolve('db');

const blue = '\x1b[34m';
const red = '\x1b[31m';
const green = '\x1b[32m';
const white = '\x1b[37m';

// TODO: this is basic knex CLI implementation, some cases need to improved like running multiple seeds etc.
//  why was this function written, because knex is not very friendly with typescript =(
// https://github.com/knex/knex/issues/4793
async function knexCLI() {
    const args = process.argv.slice(2);

    if (args.length == 0) {
        console.error(red, 'Error: missing knex command in argument');
        return;
    }

    const [command, value] = args;

    function showMigrationResult(label: string, [batch, migrations]: MigrationResult) {
        if (migrations.length === 0) {
            console.log('No migrations affected.');
            return;
        }
        console.log(label, 'batch:', batch);
        console.log('migrations:');
        console.log(blue, migrations.map((s) => '- ' + s).join('\n'));
    }

    switch (command) {
        case COMMANDS.UP: {
            showMigrationResult('migrate:up', (await knex.migrate.up()) as MigrationResult);
            break;
        }
        case COMMANDS.DOWN: {
            showMigrationResult('migrate:down', (await knex.migrate.down()) as MigrationResult);
            break;
        }
        case COMMANDS.LATEST: {
            showMigrationResult('migrate:latest', (await knex.migrate.latest()) as MigrationResult);
            break;
        }
        case COMMANDS.ROLLBACK: {
            const config = undefined;
            const all = value === '--all';
            showMigrationResult('rollback', (await knex.migrate.rollback(config, all)) as MigrationResult);
            break;
        }
        case COMMANDS.MAKE: {
            if (value) {
                const name = await knex.migrate.make(value);

                console.log(green, 'Migration was created:', blue, name.split('/').at(-1));
            }
            break;
        }
        case COMMANDS.LIST: {
            type Result = [{ name: string }[], { file: string }[]];
            const [done, pending] = (await knex.migrate.list()) as Result;

            console.log(done.length, green, 'applied migrations');
            for (const each of done) {
                console.log('-', blue, each.name);
            }

            console.log(pending.length, white, 'pending migrations');
            for (const each of pending) {
                console.log('-', blue, each.file);
            }
            break;
        }
        case COMMANDS.SEED_MAKE: {
            if (value) {
                const name = await knex.seed.make(value);

                console.log(green, 'Seed was created:', blue, name.split('/').at(-1));
            }
            break;
        }

        case COMMANDS.SEED_RUN: {
            if (value && value.startsWith('--file=')) {
                const fileName = value.split('=').at(-1);

                if (!fileName) {
                    console.error(red, 'Error: filename not provided');
                    return;
                }

                const seeds = await knex.seed.run({ specific: fileName });

                console.log('Running seeds');
                for (const seed of seeds) {
                    console.log(blue, seed);
                }
            }

            break;
        }

        default: {
            console.error(red, 'Error: unknown arguments:', args);
        }
    }
}

void knexCLI()
    .catch((e) => console.error(e))
    .then(() => knex.destroy());
