"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleError = void 0;
const CustomErrors_1 = require("./CustomErrors");
const HandleError = (_req, res, err) => {
    if (err instanceof CustomErrors_1.BaseError) {
        res.statusCode = err.code;
        res.end(err.message);
    }
    else if (err instanceof SyntaxError) {
        res.statusCode = 400;
        res.end(`
            There is a SyntaxError
            There are the possible reason:
            Unexpected token } in JSON -> Remove last comma
        `);
    }
    else if (err instanceof CustomErrors_1.NotFoundError) {
        res.statusCode = err.code;
        res.end("Not Found" /* ErrorMessages.NOT_FOUND */);
    }
    else if (err instanceof CustomErrors_1.InvalidToken) {
        res.statusCode = err.code;
        res.end("Invalid token" /* ErrorMessages.INVALID_TOKEN */);
    }
    else {
        const { code, message } = new CustomErrors_1.ServerInternalError();
        res.statusCode = code;
        res.end(message);
    }
};
exports.HandleError = HandleError;
