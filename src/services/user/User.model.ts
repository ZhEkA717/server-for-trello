export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string;
    accessLevel: AccessLevel;
}

export type IUserParams = Omit<IUser, 'id' | 'token'>;

export enum AccessLevel {
    "Admin",
    "User",
    "Anonymous"
}
