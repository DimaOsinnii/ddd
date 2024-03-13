import type { FastifyInstance } from 'fastify';

import container from '@ioc/container';

import { usersRoutes } from './users';

export default function (fastify: FastifyInstance) {
    void fastify.register(usersRoutes, container.resolve('userUseCases'));
}
