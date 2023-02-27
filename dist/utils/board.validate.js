"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boardValidate = void 0;
const CustomErrors_1 = require("../Errors/CustomErrors");
const boardValidate = (board) => {
    const { nameBoard, descriptionBoard } = board;
    if (nameBoard && typeof board.nameBoard !== 'string')
        throw new CustomErrors_1.BoardBadRequestError(CustomErrors_1.BoardValidationError.nameBoard);
    if (descriptionBoard && typeof board.descriptionBoard !== 'string')
        throw new CustomErrors_1.BoardBadRequestError(CustomErrors_1.BoardValidationError.descriptionBoard);
};
exports.boardValidate = boardValidate;
