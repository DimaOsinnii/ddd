import type { FastifyInstance } from 'fastify';
import type { IUserUseCases } from '@application/useCases/users/IUserUseCases';

// eslint-disable-next-line @typescript-eslint/require-await
export async function authRoutes(fastify: FastifyInstance, userUseCases: IUserUseCases) {
    fastify.route({
        url: '/register',
        method: 'post',
        handler: () => {},
    });

    fastify.route({
        url: '/login',
        method: 'post',
        handler: () => {},
    });

    fastify.route({
        url: '/login/google',
        method: 'get',
        handler: () => {},
    });

    fastify.route({
        url: '/login/github',
        method: 'get',
        handler: () => {},
    });

    fastify.route({
        url: '/login/google/callback',
        method: 'get',
        handler: () => {},
    });

    fastify.route({
        url: '/login/github/callback',
        method: 'get',
        handler: () => {},
    });

    fastify.route({
        url: '/logout',
        method: 'post',
        handler: () => {},
    });
}
