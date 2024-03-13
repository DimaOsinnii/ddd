import type { CreateUserUseCase } from '@application/useCases/users/IUserUseCases';

import { hashPassword } from '@domain/users';
import { toUserDTO } from '@application/dto/user';
import { UniqueConstraintError } from '../../../utils/errors/infrastructure/postgres';
import { ValidationError } from '../../../utils/errors/application';

const makeCreateUser: CreateUserUseCase = (userDataAccess) => async (dto) => {
    const { username, email, password } = dto;

    const hashedPassword = await hashPassword(password);

    try {
        const createdUser = await userDataAccess.create({
            username,
            email,
            password: hashedPassword,
            isEmailVerified: false,
        });

        return toUserDTO(createdUser);
    } catch (error) {
        if (!(error instanceof UniqueConstraintError)) throw error;

        throw new ValidationError(`${error.column}: ${error.value} is already taken.`);
    }
};

export default makeCreateUser;
