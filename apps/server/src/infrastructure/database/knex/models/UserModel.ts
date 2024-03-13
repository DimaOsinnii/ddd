export interface UserModel {
    id: number;
    email: string;
    username: string;
    password: string;
    isEmailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}
