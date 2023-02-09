"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = void 0;
const uuid_1 = require("uuid");
const constants_1 = require("../../utils/constants");
const dbUsers = (0, constants_1.getUserDB)();
const getUser = (email) => {
    return dbUsers.find((user) => user.email === email);
};
exports.getUser = getUser;
const createUser = (userParams) => {
    const { firstName, lastName, email, password } = userParams;
    const newUser = {
        id: (0, uuid_1.v4)(),
        firstName,
        lastName,
        email,
        password
    };
    dbUsers.push(newUser);
    return newUser;
};
exports.createUser = createUser;
