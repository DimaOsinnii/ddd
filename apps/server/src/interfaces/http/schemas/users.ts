import type { FromSchema, JSONSchema } from 'json-schema-to-ts';

export const getUserByIdParamsSchema = {
    type: 'object',
    properties: {
        id: { type: 'number' },
    },
    required: ['id'],
} as const satisfies JSONSchema;

export const createUserBodySchema = {
    type: 'object',
    required: ['username', 'email', 'password'],
    properties: {
        username: { type: 'string', minLength: 3, maxLength: 30 },
        email: { type: 'string', format: 'email' },
        password: {
            type: 'string',
            minLength: 8,
            pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
        },
    },
} as const satisfies JSONSchema;

export type TCreateUserBodySchema = FromSchema<typeof createUserBodySchema>;
export type TGetUserByIdParamsSchema = FromSchema<typeof getUserByIdParamsSchema>;
