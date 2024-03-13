import type { FastifyInstance } from 'fastify';
import type { IUserUseCases } from '@application/useCases/users/IUserUseCases';

import type { TGetUserByIdParamsSchema, TCreateUserBodySchema } from '../schemas/users';

import { getUserByIdParamsSchema, createUserBodySchema } from '../schemas/users';

// eslint-disable-next-line @typescript-eslint/require-await
export async function usersRoutes(fastify: FastifyInstance, userUseCases: IUserUseCases) {
    fastify.route<{ Body: TCreateUserBodySchema }>({
        url: '/users',
        method: 'post',
        schema: { body: createUserBodySchema },
        handler: (request) => userUseCases.createUserUseCase(request.body),
    });

    fastify.route<{ Params: TGetUserByIdParamsSchema }>({
        url: '/users/:id',
        method: 'get',
        schema: { params: getUserByIdParamsSchema },
        handler: (request) => userUseCases.getUserByIdUseCase(request.params.id),
    });

    fastify.route({
        url: '/profile',
        method: 'get',
        handler: () => {},
    });
}
