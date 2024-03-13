import { createFastifyServer } from '@interfaces/http/fastify';
import container from '@ioc/container';

async function bootstrapApplication() {
    const { port } = container.cradle.config;
    const server = createFastifyServer();

    try {
        await server.listen({ port });
    } catch (error) {
        server.log.error(error);
        process.exit(1);
    }
}

void bootstrapApplication();
