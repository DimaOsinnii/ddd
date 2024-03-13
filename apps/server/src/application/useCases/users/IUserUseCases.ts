import type { UserDataAccess } from '@domain/dataAccess/UserDataAccess';
import type { CreateUserDTO, UserDTO } from '@application/dto/user';

export interface CreateUserUseCase {
    (userDataAccess: UserDataAccess): (dto: CreateUserDTO) => Promise<UserDTO>;
}

export interface GetUserByIdUseCases {
    (userDataAccess: UserDataAccess): (id: number) => Promise<UserDTO>;
}

export interface IUserUseCasesFactory {
    (userDataAccess: UserDataAccess): IUserUseCases;
}

export interface IUserUseCases {
    createUserUseCase: ReturnType<CreateUserUseCase>;
    getUserByIdUseCase: ReturnType<GetUserByIdUseCases>;
}
