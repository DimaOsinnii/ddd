import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('users').del();

    // Inserts seed entries
    await knex('users').insert([
        {
            email: 'test@test.com',
            username: 'testName',
            password: 'ads',
        },
        {
            email: 'test2@test.com',
            username: 'testName',
            password: 'ads',
        },
        {
            email: 'test3@test.com',
            username: 'testName',
            password: '123',
        },
    ]);
}
