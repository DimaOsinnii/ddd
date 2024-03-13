import type { User } from '@domain/users';

export interface CreateUserDTO {
    username: string;
    email: string;
    password: string;
}

export type UserDTO = Omit<User, 'password'>;

export function toUserDTO(user: User): UserDTO {
    return {
        id: user.id,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        username: user.username,
    };
}
