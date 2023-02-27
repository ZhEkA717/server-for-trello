"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../common/config");
const HandlerError_1 = require("../Errors/HandlerError");
const network_1 = require("../utils/network");
const CustomErrors_1 = require("../Errors/CustomErrors");
const User_service_1 = require("../services/user/User.service");
const getUserFromDecodedToken = (jwtToken) => (0, User_service_1.getUserById)(jwtToken.userId);
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'OPTIONS')
        return next();
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    });
    req.on('end', () => {
        const token = req.headers['x-access-token'];
        if (!token) {
            return (0, network_1.sendResponse)({
                response: res,
                statusCode: 403,
                statusMessage: 'A token is required',
            });
        }
        try {
            jsonwebtoken_1.default.verify(token, config_1.envConfig.TOKEN_KEY, (err, decoded) => {
                if (err)
                    throw new CustomErrors_1.InvalidToken(err.message);
                req.user = getUserFromDecodedToken(decoded);
                req.bodyData = data;
                return next();
            });
        }
        catch (err) {
            (0, HandlerError_1.HandleError)(req, res, err);
        }
    });
});
exports.auth = auth;
