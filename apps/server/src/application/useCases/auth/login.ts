import type { LoginUseCaseFactory } from '@application/useCases/auth/IAuthUseCases';

const makeLogin: LoginUseCaseFactory = (userDataAccess) => (dto) => new Promise((resolve) => resolve(''));

export default makeLogin;
