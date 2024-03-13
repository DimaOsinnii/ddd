import Fastify from 'fastify';

import registerRoutes from './routes';
import registerErrorHandler from './error';

export function createFastifyServer() {
    const fastify = Fastify({ logger: true });

    registerRoutes(fastify);
    registerErrorHandler(fastify);

    return fastify;
}
