import type { RegisterUseCaseFactory } from '@application/useCases/auth/IAuthUseCases';

const makeRegister: RegisterUseCaseFactory = () => () => new Promise((resolve) => resolve(''));

export default makeRegister;
