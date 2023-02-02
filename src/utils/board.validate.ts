import { BadRequestError, BoardBadRequestError, BoardValidationError } from "../Errors/CustomErrors";
import { IBoard } from "../services/Board.model";

export const boardValidate = (board: IBoard) => {
    const requiredFields = ['nameBoard', 'descriptionBoard', 'columns'].sort();
    const boardFields = Object.keys(board).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(boardFields)) throw new BadRequestError('field');

    if (typeof board.nameBoard !== 'string') throw new BoardBadRequestError(BoardValidationError.nameBoard);
    if (typeof board.descriptionBoard !== 'string') throw new BoardBadRequestError(BoardValidationError.descriptionBoard);
    if (!Array.isArray(board.columns)) throw new BoardBadRequestError(BoardValidationError.columns);
}
