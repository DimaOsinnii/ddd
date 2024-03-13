import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', (tableBuilder) => {
        tableBuilder.increments('id').primary();
        tableBuilder.string('email').unique().notNullable();
        tableBuilder.string('username').unique().notNullable();
        tableBuilder.string('password').notNullable();
        tableBuilder.string('isEmailVerified').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('users');
}
