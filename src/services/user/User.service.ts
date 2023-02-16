import { v4 } from "uuid";
import { getUserDB } from "../../utils/constants";
import { IUser, IUserParams, UserEditParams } from "./User.model";

const dbUsers = getUserDB();

export const getUser = (email: string): IUser | undefined => {
    return dbUsers.find((user: IUser) => user.email === email.toLowerCase());
}

export const getUserById = (id: string): IUser | undefined => dbUsers.find((user: IUser) => user.id === id);

export const createUser = (userParams: IUserParams): IUser => {
    const { firstName, lastName, email, password, accessLevel, gender } = userParams;

    const newUser: IUser = {
        id: v4(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        accessLevel,
        gender,
        registrationDate: new Date()
    };
    dbUsers.push(newUser);

    return newUser;
}

export const editUser = (id: string, newUserInfo: UserEditParams): void => {
    const user: IUser | undefined = getUserById(id);

    if (user) Object.assign(user, newUserInfo);
}
