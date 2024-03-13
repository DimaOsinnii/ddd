import type { IAuthUseCasesFactory } from '@application/useCases/auth/IAuthUseCases';

import makeRegister from './register';
import makeLogin from './login';

export const makeAuthUseCases: IAuthUseCasesFactory = (userDataAccess) => ({
    registerUseCase: makeRegister(userDataAccess),
    loginUseCase: makeLogin(userDataAccess),
});
