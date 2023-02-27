"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessWithLevel = void 0;
const User_model_1 = require("../services/user/User.model");
const network_1 = require("../utils/network");
const hasAccess = (req, res, next, requireAccessLevel) => {
    let access = false;
    if (req.user) {
        access = requireAccessLevel.includes(req.user.accessLevel);
    }
    else {
        access = requireAccessLevel.includes(User_model_1.AccessLevel.Anonymous);
    }
    if (access) {
        next();
    }
    else {
        (0, network_1.sendResponse)({
            response: res,
            statusCode: 401,
            statusMessage: 'Access denied',
        });
    }
};
const accessWithLevel = (accessLevel) => (req, res, next) => hasAccess(req, res, next, accessLevel);
exports.accessWithLevel = accessWithLevel;
