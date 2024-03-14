import type { IAuthUseCasesFactory } from '@application/useCases/auth/IAuthUseCases';

import makeLogin from './login';
import makeRegister from './register';

export const makeAuthUseCases: IAuthUseCasesFactory = (userDataAccess) => ({
    registerUseCase: makeRegister(userDataAccess),
    loginUseCase: makeLogin(userDataAccess),
});
