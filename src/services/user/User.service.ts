import { v4 } from "uuid";
import { getUserDB } from "../../utils/constants";
import { IUser, IUserParams } from "./User.model";

const dbUsers = getUserDB();

export const getUser = (email: string): IUser | undefined => {
    return dbUsers.find((user: IUser) => user.email === email.toLowerCase());
}

export const createUser = (userParams: IUserParams): IUser => {
    const { firstName, lastName, email, password } = userParams;

    const newUser = {
        id: v4(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        password
    };
    dbUsers.push(newUser);

    return newUser;
}