import { asFunction, asValue, createContainer, InjectionMode } from 'awilix';

import type { IContainer } from '@ioc/IContainer';

import { createKnexPgClient } from '@infrastructure/database/knex';

import { makeUserDataAccess } from '@infrastructure/dataAccess';

import { makeUserUseCases } from '@application/useCases/users';

import config from '@infrastructure/config';

const container = createContainer<IContainer>({ injectionMode: InjectionMode.CLASSIC, strict: true });

container.register({
    config: asValue(config),
    db: asFunction(createKnexPgClient)
        .singleton()
        .inject(() => ({ config: config.db })),
});

//Data access
container.register({
    userDataAccess: asFunction(makeUserDataAccess).singleton(),
});

//Use cases
container.register({
    userUseCases: asFunction(makeUserUseCases).singleton(),
});

export default container;
