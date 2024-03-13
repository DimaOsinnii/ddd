import type { IUserUseCasesFactory } from '@application/useCases/users/IUserUseCases';

import makeCreateUser from './createUser';
import makeGetUserById from './getUserById';

export const makeUserUseCases: IUserUseCasesFactory = (userDataAccess) => ({
    createUserUseCase: makeCreateUser(userDataAccess),
    getUserByIdUseCase: makeGetUserById(userDataAccess),
});
