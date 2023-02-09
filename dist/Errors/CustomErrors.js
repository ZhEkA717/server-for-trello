"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskBadRequestError = exports.ColumnBadRequestError = exports.BoardBadRequestError = exports.BadRequestError = exports.CrashDataBaseError = exports.NotExistBoardError = exports.NotExistUserError = exports.InvalidUUIDError = exports.ServerInternalError = exports.InvalidToken = exports.NotFoundError = exports.BaseError = exports.TaskValidationError = exports.ColumnValidationError = exports.BoardValidationError = void 0;
var BoardValidationError;
(function (BoardValidationError) {
    BoardValidationError["nameBoard"] = "name of board";
    BoardValidationError["descriptionBoard"] = "description of board";
})(BoardValidationError = exports.BoardValidationError || (exports.BoardValidationError = {}));
var ColumnValidationError;
(function (ColumnValidationError) {
    ColumnValidationError["nameColumn"] = "name of column";
    ColumnValidationError["descriptionColumn"] = "description of column";
})(ColumnValidationError = exports.ColumnValidationError || (exports.ColumnValidationError = {}));
var TaskValidationError;
(function (TaskValidationError) {
    TaskValidationError["nameTask"] = "name of task";
    TaskValidationError["descriptionTask"] = "description of task";
})(TaskValidationError = exports.TaskValidationError || (exports.TaskValidationError = {}));
class BaseError {
    constructor(message, code = 500) {
        this.message = message;
        this.code = code;
    }
}
exports.BaseError = BaseError;
class NotFoundError extends BaseError {
    constructor(message = "Route Not Found" /* ERROR_MESSAGES.NOT_FOUND */) {
        super(message, 404);
    }
}
exports.NotFoundError = NotFoundError;
class InvalidToken extends BaseError {
    constructor(message = "Invalid token" /* ERROR_MESSAGES.INVALID_TOKEN */) {
        super(message, 401);
    }
}
exports.InvalidToken = InvalidToken;
class ServerInternalError extends BaseError {
    constructor(message = "Server Internal Error" /* ERROR_MESSAGES.SERVER_INTERNAL */) {
        super(message, 500);
    }
}
exports.ServerInternalError = ServerInternalError;
class InvalidUUIDError extends BaseError {
    constructor(id) {
        id === '' ?
            super(`UserID is empty`, 400) :
            super(`UserID = ${id} is invalid (not uuid)`, 400);
    }
}
exports.InvalidUUIDError = InvalidUUIDError;
class NotExistUserError extends BaseError {
    constructor(id) {
        super(`User with UserID = ${id} is not found`, 404);
    }
}
exports.NotExistUserError = NotExistUserError;
class NotExistBoardError extends BaseError {
    constructor(id) {
        super(`Board with BoardID = ${id} is not found`, 404);
    }
}
exports.NotExistBoardError = NotExistBoardError;
class CrashDataBaseError extends BaseError {
    constructor() {
        super(`Data base is corrupted\n. Please reload the App`, 400);
    }
}
exports.CrashDataBaseError = CrashDataBaseError;
class BadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nRequst.body does not contain required fields`, 400);
                break;
            case 'username':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nusername must be a string`, 400);
                break;
            case 'age':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\age must be a string`, 400);
                break;
            case 'hobbies':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nhobbies must be an array`, 400);
                break;
            case 'hobbiesArray':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nhobbies should include only string`, 400);
                break;
        }
    }
}
exports.BadRequestError = BadRequestError;
class BoardBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nRequst.body does not contain required fields`, 400);
                break;
            case BoardValidationError.nameBoard:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${BoardValidationError.nameBoard} must be a string`, 400);
                break;
            case BoardValidationError.descriptionBoard:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${BoardValidationError.descriptionBoard} must be a string`, 400);
                break;
        }
    }
}
exports.BoardBadRequestError = BoardBadRequestError;
class ColumnBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nRequst.body does not contain required fields`, 400);
                break;
            case ColumnValidationError.nameColumn:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${ColumnValidationError.nameColumn} must be a string`, 400);
                break;
            case ColumnValidationError.descriptionColumn:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${ColumnValidationError.descriptionColumn} must be a string`, 400);
                break;
        }
    }
}
exports.ColumnBadRequestError = ColumnBadRequestError;
class TaskBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\nRequst.body does not contain required fields`, 400);
                break;
            case TaskValidationError.nameTask:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${TaskValidationError.nameTask} must be a string`, 400);
                break;
            case TaskValidationError.descriptionTask:
                super(`${"Bad Request" /* ERROR_MESSAGES.BAD_REQUEST */}\n${TaskValidationError.descriptionTask} must be a string`, 400);
                break;
        }
    }
}
exports.TaskBadRequestError = TaskBadRequestError;
