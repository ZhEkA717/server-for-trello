export interface IUser {
    id?: string;
    username: string;
    age: number;
    hobbies: Array<string>;
}

export class IUSER_DEFAULT implements IUser {
    username: string = '';
    age: number = 0;
    hobbies: string[] = []
}
