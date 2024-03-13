import type { RouteGenericInterface, RouteHandler } from 'fastify';

export interface RouteHandlerFactory<U, T extends RouteGenericInterface = RouteGenericInterface> {
    (useCase: U): RouteHandler<T>;
}
