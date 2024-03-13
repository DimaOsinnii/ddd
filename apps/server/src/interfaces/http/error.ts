import type { FastifyInstance } from 'fastify';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { NotFoundError, ValidationError } from '../../utils/errors/application';

export default function registerErrorHandler(fastify: FastifyInstance) {
    fastify.setErrorHandler((error, request, reply) => {
        if (error instanceof ValidationError) {
            return reply
                .status(StatusCodes.CONFLICT)
                .send({ message: error.message, statusCode: StatusCodes.CONFLICT, error: ReasonPhrases.CONFLICT });
        }
        if (error instanceof NotFoundError) {
            return reply
                .status(StatusCodes.NOT_FOUND)
                .send({ message: error.message, statusCode: StatusCodes.NOT_FOUND, error: ReasonPhrases.NOT_FOUND });
        }

        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    });
}
