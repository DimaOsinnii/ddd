import type { Knex } from 'knex';
import type { AppConfig } from '@infrastructure/config/types';
import type { UserDataAccess } from '@domain/dataAccess/UserDataAccess';
import type { IUserUseCases } from '@application/useCases/users/IUserUseCases';

export interface IContainer {
    config: AppConfig;
    db: Knex;
    userDataAccess: UserDataAccess;
    userUseCases: IUserUseCases;
}
