import { knex } from 'knex';

import type { DBConfig } from '@infrastructure/config/types';

import path from 'node:path';

export function createKnexPgClient(config: DBConfig) {
    const { port, host, user, password, name: database } = config;

    return knex({
        client: 'pg',
        connection: {
            port,
            host,
            user,
            password,
            database,
        },
        migrations: {
            directory: path.join(__dirname, './migrations'),
            extension: 'ts',
        },
        seeds: {
            directory: path.join(__dirname, './seeds'),
            extension: 'ts',
        },
    });
}
