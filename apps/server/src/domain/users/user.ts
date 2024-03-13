import type { User } from './types';

export function createUser(userData: User): User {
    return {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        password: userData.password,
        isEmailVerified: userData.isEmailVerified ?? false,
    };
}
