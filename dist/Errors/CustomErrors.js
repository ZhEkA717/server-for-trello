"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckboxBadRequestError = exports.TaskBadRequestError = exports.ColumnBadRequestError = exports.BoardBadRequestError = exports.BadRequestError = exports.CrashDataBaseError = exports.NotExistError = exports.NotExistBoardError = exports.NotExistUserError = exports.InvalidUUIDError = exports.RequiredParametersNotProvided = exports.ServerInternalError = exports.InvalidToken = exports.NotFoundError = exports.BaseError = exports.CheckboxValidationError = exports.TaskValidationError = exports.ColumnValidationError = exports.BoardValidationError = exports.ElementTypes = void 0;
var ErrorCodes;
(function (ErrorCodes) {
    ErrorCodes[ErrorCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorCodes[ErrorCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorCodes[ErrorCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
    ErrorCodes[ErrorCodes["SERVER_ERROR"] = 500] = "SERVER_ERROR";
})(ErrorCodes || (ErrorCodes = {}));
var ElementTypes;
(function (ElementTypes) {
    ElementTypes["BOARD"] = "Board";
    ElementTypes["COLUMN"] = "Column";
    ElementTypes["TASK"] = "Task";
    ElementTypes["CHECKBOX"] = "Checkbox";
    ElementTypes["CHECKLIST"] = "Checklist for task";
})(ElementTypes = exports.ElementTypes || (exports.ElementTypes = {}));
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
var CheckboxValidationError;
(function (CheckboxValidationError) {
    CheckboxValidationError["nameCheckBox"] = "name of task";
})(CheckboxValidationError = exports.CheckboxValidationError || (exports.CheckboxValidationError = {}));
class BaseError extends Error {
    constructor(message, code = ErrorCodes.SERVER_ERROR) {
        super(message);
        this.message = message;
        this.code = code;
    }
}
exports.BaseError = BaseError;
class NotFoundError extends BaseError {
    constructor(message = "Not Found" /* ErrorMessages.NOT_FOUND */) {
        super(message, ErrorCodes.NOT_FOUND);
    }
}
exports.NotFoundError = NotFoundError;
class InvalidToken extends BaseError {
    constructor(message = "Invalid token" /* ErrorMessages.INVALID_TOKEN */) {
        super(message, ErrorCodes.UNAUTHORIZED);
    }
}
exports.InvalidToken = InvalidToken;
class ServerInternalError extends BaseError {
    constructor(message = "Server Internal Error" /* ErrorMessages.SERVER_INTERNAL */) {
        super(message, ErrorCodes.SERVER_ERROR);
    }
}
exports.ServerInternalError = ServerInternalError;
class RequiredParametersNotProvided extends BaseError {
    constructor(message = "Required parameters not provided" /* ErrorMessages.PARAMETERS_NOT_PROVIDED */) {
        super(message, ErrorCodes.NOT_FOUND);
    }
}
exports.RequiredParametersNotProvided = RequiredParametersNotProvided;
class InvalidUUIDError extends BaseError {
    constructor(id) {
        if (id === '') {
            super(`ID is empty`, ErrorCodes.BAD_REQUEST);
        }
        else {
            super(`ID = ${id} is invalid (not uuid)`, ErrorCodes.BAD_REQUEST);
        }
    }
}
exports.InvalidUUIDError = InvalidUUIDError;
class NotExistUserError extends BaseError {
    constructor(id) {
        super(`User with UserID = ${id} is not found`, ErrorCodes.NOT_FOUND);
    }
}
exports.NotExistUserError = NotExistUserError;
class NotExistBoardError extends BaseError {
    constructor(id) {
        super(`Board with BoardID = ${id} is not found`, ErrorCodes.NOT_FOUND);
    }
}
exports.NotExistBoardError = NotExistBoardError;
class NotExistError extends BaseError {
    constructor(type, id) {
        super(`${type} with ID = ${id} is not found`, ErrorCodes.NOT_FOUND);
    }
}
exports.NotExistError = NotExistError;
class CrashDataBaseError extends BaseError {
    constructor() {
        super(`Data base is corrupted\n. Please reload the App`, ErrorCodes.BAD_REQUEST);
    }
}
exports.CrashDataBaseError = CrashDataBaseError;
class BadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\nRequst.body does not contain required fields`, ErrorCodes.BAD_REQUEST);
                break;
            default:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}`);
        }
    }
}
exports.BadRequestError = BadRequestError;
class BoardBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\nRequst.body does not contain required fields`, ErrorCodes.BAD_REQUEST);
                break;
            case BoardValidationError.nameBoard:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${BoardValidationError.nameBoard} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            case BoardValidationError.descriptionBoard:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${BoardValidationError.descriptionBoard} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            default:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}`);
        }
    }
}
exports.BoardBadRequestError = BoardBadRequestError;
class ColumnBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\nRequst.body does not contain required fields`, ErrorCodes.BAD_REQUEST);
                break;
            case ColumnValidationError.nameColumn:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${ColumnValidationError.nameColumn} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            case ColumnValidationError.descriptionColumn:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${ColumnValidationError.descriptionColumn} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            default:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}`);
        }
    }
}
exports.ColumnBadRequestError = ColumnBadRequestError;
class TaskBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\nRequst.body does not contain required fields`, ErrorCodes.BAD_REQUEST);
                break;
            case TaskValidationError.nameTask:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${TaskValidationError.nameTask} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            case TaskValidationError.descriptionTask:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${TaskValidationError.descriptionTask} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            default:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}`);
        }
    }
}
exports.TaskBadRequestError = TaskBadRequestError;
class CheckboxBadRequestError extends BaseError {
    constructor(option) {
        switch (option) {
            case 'field':
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\nRequst.body does not contain required fields`, ErrorCodes.BAD_REQUEST);
                break;
            case CheckboxValidationError.nameCheckBox:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}\n${CheckboxValidationError.nameCheckBox} must be a string`, ErrorCodes.BAD_REQUEST);
                break;
            default:
                super(`${"Bad Request" /* ErrorMessages.BAD_REQUEST */}`);
        }
    }
}
exports.CheckboxBadRequestError = CheckboxBadRequestError;
