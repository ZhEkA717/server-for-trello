import connect from 'connect';
import { ServerResponse } from "http";
import { IRequest } from "../Server/server.interface";
import { AccessLevel } from '../services/user/User.model';
import { sendResponse } from '../utils/network';

export const accessWithLevel = (accessLevel: AccessLevel[]) => (
    req: IRequest,
    res: ServerResponse,
    next: connect.NextFunction
) => (
    hasAccess(req, res, next, accessLevel)
);

const hasAccess = (
    req: IRequest,
    res: ServerResponse,
    next: connect.NextFunction,
    requireAccessLevel: AccessLevel[]
): void => {
    let hasAccess = false;
    if (req.user) {
        hasAccess = requireAccessLevel.includes(req.user.accessLevel);
    } else {
        hasAccess = requireAccessLevel.includes(AccessLevel.Anonymous);
    }

    if (hasAccess) {
        next();
    } else {
        sendResponse({
            response: res,
            statusCode: 401,
            statusMessage: "Access denied",
        })
    }
}