export interface IUser {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    token?: string;
}

export type IUserParams = Omit<IUser, 'id' | 'token'>;