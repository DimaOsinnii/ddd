import type { Knex } from 'knex';
import type { UserDataAccess } from '@domain/dataAccess/UserDataAccess';
import type { UserModel } from '@infrastructure/database/knex/models/UserModel';

import { createUserPassword, createUser } from '@domain/users';
import { handleDatabaseError } from '@infrastructure/database/knex/errors';

function toDomain(userModel?: UserModel) {
    if (!userModel) return null;

    const { password, ...userData } = userModel;

    return createUser({ ...userData, password: createUserPassword(password, true) });
}

export function knexUserDataAccess(db: Knex): UserDataAccess {
    return {
        exists: async (email) => {
            const userModel = await db('users').where({ email }).first();

            return !!userModel;
        },

        create: async ({ password, email, username, isEmailVerified }) => {
            try {
                const result = await db('users').insert({ password, email, username, isEmailVerified }).returning('*');
                return toDomain(result[0])!;
            } catch (error) {
                throw handleDatabaseError(error);
            }
        },
        findById: async (id) => {
            const userModel = await db('users').where({ id }).first();

            return toDomain(userModel);
        },

        findByUsername: async (username: string) => {
            const userModel = await db('users').where({ username }).first();

            return toDomain(userModel);
        },
    };
}
