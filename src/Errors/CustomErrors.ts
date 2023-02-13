import { ERROR_MESSAGES } from "./error.messages";

export enum BoardValidationError {
    nameBoard = 'name of board',
    descriptionBoard = 'description of board',
}
export enum ColumnValidationError {
    nameColumn = 'name of column',
    descriptionColumn = 'description of column',
}
export enum TaskValidationError {
    nameTask = 'name of task',
    descriptionTask = 'description of task',
}
export enum CheckboxValidationError {
    nameCheckBox = 'name of task',
}

export class BaseError {
    message: string;
    code: number;

    constructor(message: string, code = 500) {
        this.message = message;
        this.code = code;
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.NOT_FOUND) {
        super(message, 404);
    }
}

export class InvalidToken extends BaseError {
    constructor(message: string = ERROR_MESSAGES.INVALID_TOKEN) {
        super(message, 401);
    }
}

export class ServerInternalError extends BaseError {
    constructor(message: string = ERROR_MESSAGES.SERVER_INTERNAL) {
        super(message, 500);
    }
}

export class InvalidUUIDError extends BaseError {
    constructor(id: string) {
        id === '' ?
            super(`UserID is empty`, 400) :
            super(`UserID = ${id} is invalid (not uuid)`, 400)
    }
}

export class NotExistUserError extends BaseError {
    constructor(id: string) {
        super(`User with UserID = ${id} is not found`, 404)
    }
}

export class NotExistBoardError extends BaseError {
    constructor(id: string) {
        super(`Board with BoardID = ${id} is not found`, 404)
    }
}

export class CrashDataBaseError extends BaseError {
    constructor() {
        super(`Data base is corrupted\n. Please reload the App`, 400)
    }
}

export class BadRequestError extends BaseError {
    constructor(option: string) {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case 'username':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nusername must be a string`, 400);
                break;
            case 'age':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\age must be a string`, 400);
                break;
            case 'hobbies':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nhobbies must be an array`, 400);
                break;
            case 'hobbiesArray':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nhobbies should include only string`, 400);
                break;
        }

    }
}

export class BoardBadRequestError extends BaseError {
    constructor(option: BoardValidationError | 'field') {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case BoardValidationError.nameBoard:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${BoardValidationError.nameBoard} must be a string`, 400);
                break;
            case BoardValidationError.descriptionBoard:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${BoardValidationError.descriptionBoard} must be a string`, 400);
                break;
        }

    }
}
export class ColumnBadRequestError extends BaseError {
    constructor(option: ColumnValidationError | 'field') {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case ColumnValidationError.nameColumn:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${ColumnValidationError.nameColumn} must be a string`, 400);
                break;
            case ColumnValidationError.descriptionColumn:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${ColumnValidationError.descriptionColumn} must be a string`, 400);
                break;
        }

    }
}

export class TaskBadRequestError extends BaseError {
    constructor(option: TaskValidationError | 'field') {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case TaskValidationError.nameTask:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${TaskValidationError.nameTask} must be a string`, 400);
                break;
            case TaskValidationError.descriptionTask:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${TaskValidationError.descriptionTask} must be a string`, 400);
                break;
        }
    }
}

export class CheckboxBadRequestError extends BaseError {
    constructor(option: CheckboxValidationError | 'field') {
        switch (option) {
            case 'field':
                super(`${ERROR_MESSAGES.BAD_REQUEST}\nRequst.body does not contain required fields`, 400);
                break;
            case CheckboxValidationError.nameCheckBox:
                super(`${ERROR_MESSAGES.BAD_REQUEST}\n${CheckboxValidationError.nameCheckBox} must be a string`, 400);
                break;
        }
    }
}