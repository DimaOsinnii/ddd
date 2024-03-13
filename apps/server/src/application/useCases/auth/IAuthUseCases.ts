import type { UserDataAccess } from '@domain/dataAccess/UserDataAccess';
import type { LoginDTO, RegisterDTO } from '@application/dto/auth';

export interface RegisterUseCaseFactory {
    (userDataAccess: UserDataAccess): (dto: RegisterDTO) => Promise<unknown>;
}

export interface LoginUseCaseFactory {
    (userDataAccess: UserDataAccess): (dto: LoginDTO) => Promise<unknown>;
}

export interface IAuthUseCasesFactory {
    (userDataAccess: UserDataAccess): IAuthUseCases;
}

export interface IAuthUseCases {
    registerUseCase: ReturnType<RegisterUseCaseFactory>;
    loginUseCase: ReturnType<LoginUseCaseFactory>;
}
