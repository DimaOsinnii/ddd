import type { Password, User } from '@domain/users';
import type { Nullable } from '@utils/types';

import type { BaseDataAccess } from './BaseDataAccess';

interface CreateUserData extends Pick<User, 'username' | 'email' | 'isEmailVerified'> {
    password: Password['value'];
}

export interface UserDataAccess extends BaseDataAccess<User, CreateUserData> {
    exists: (email: string) => Promise<boolean>;
    findByUsername: (username: string) => Promise<Nullable<User>>;
}
