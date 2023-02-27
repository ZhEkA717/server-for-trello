"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUser = exports.createUser = exports.getUserProfileById = exports.getUserById = exports.getUser = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../../utils/constants");
const dbUsers = (0, constants_1.getUserDB)();
const getReturnedInfoFromUser = ({ id, firstName, lastName, email, accessLevel, gender, registrationDate, }) => ({
    id,
    firstName,
    lastName,
    email,
    accessLevel,
    gender,
    registrationDate,
});
const getUser = (email) => dbUsers.find((user) => user.email === email.toLowerCase());
exports.getUser = getUser;
const getUserById = (id) => dbUsers.find((user) => user.id === id);
exports.getUserById = getUserById;
const getUserProfileById = (userId) => {
    const user = (0, exports.getUserById)(userId);
    if (user) {
        return getReturnedInfoFromUser(user);
    }
    return undefined;
};
exports.getUserProfileById = getUserProfileById;
const createUser = (userParams) => {
    const { firstName, lastName, email, password, accessLevel, gender } = userParams;
    const newUser = {
        id: (0, uuid_1.v4)(),
        firstName,
        lastName,
        email: email.toLowerCase(),
        password,
        accessLevel,
        gender,
        registrationDate: new Date(),
    };
    dbUsers.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const editUser = (id, newUserInfo) => {
    const user = (0, exports.getUserById)(id);
    if (user) {
        Object.assign(user, newUserInfo);
        return getReturnedInfoFromUser(user);
    }
    return undefined;
};
exports.editUser = editUser;
