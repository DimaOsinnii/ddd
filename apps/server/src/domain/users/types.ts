export interface User {
    id: number;
    email: string;
    username: string;
    password: Password;
    isEmailVerified: boolean;
}

export interface Password {
    value: string;
    hashed?: boolean;
}

export interface Profile {
    age: number;
    firstName: string;
    lastName: string;
}
