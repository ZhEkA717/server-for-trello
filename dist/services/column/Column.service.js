"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveTaskInColumn = exports.moveColumnToNewPlace = exports.updateColumnById = exports.deleteColumnByID = exports.createNewColumn = exports.searchColumns = exports.searchColumn = void 0;
const uuid_1 = require("uuid");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const column_validate_1 = require("../../utils/column.validate");
const constants_1 = require("../../utils/constants");
const Board_service_1 = require("../board/Board.service");
const dataBaseBoards = (0, constants_1.getAllB)();
const searchColumn = (id) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    let correctColumn;
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            if (column.idColumn === id)
                correctColumn = column;
        });
    });
    if (!correctColumn)
        throw new CustomErrors_1.NotExistError(CustomErrors_1.ElementTypes.COLUMN, id);
    return correctColumn;
};
exports.searchColumn = searchColumn;
const searchColumns = (id) => {
    var _a;
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    return (_a = dataBaseBoards.find((board) => board.idBoard === id)) === null || _a === void 0 ? void 0 : _a.columns;
};
exports.searchColumns = searchColumns;
const searchBoardWhichExistColumn = (id) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    let correctBoard;
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            if (column.idColumn === id)
                correctBoard = board;
        });
    });
    if (!correctBoard)
        throw new CustomErrors_1.NotExistBoardError(id);
    return correctBoard;
};
const createNewColumn = (column, idBoard) => new Promise((resolve) => {
    const board = dataBaseBoards.find((boardItem) => boardItem.idBoard === idBoard);
    const idColumn = (0, uuid_1.v4)();
    const newColumn = Object.assign(Object.assign({}, column), { idColumn, tasks: [] });
    board === null || board === void 0 ? void 0 : board.columns.push(newColumn);
    resolve(newColumn);
});
exports.createNewColumn = createNewColumn;
const deleteColumnByID = (id) => {
    const existingColumn = (0, exports.searchColumn)(id);
    const existingBoard = searchBoardWhichExistColumn(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard);
    if (indexBoard === -1)
        throw new CustomErrors_1.NotFoundError('Board not found');
    const indexColumn = existingBoard.columns.indexOf(existingColumn);
    if (indexColumn === -1)
        throw new CustomErrors_1.NotFoundError('Column not found');
    dataBaseBoards[indexBoard].columns.splice(indexColumn, 1);
};
exports.deleteColumnByID = deleteColumnByID;
const updateColumnById = (id, column) => {
    (0, column_validate_1.columnValidate)(column);
    const existingColumn = (0, exports.searchColumn)(id);
    const existingBoard = searchBoardWhichExistColumn(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard);
    if (indexBoard === -1)
        throw new CustomErrors_1.NotFoundError('Board not found');
    const indexColumn = existingBoard.columns.indexOf(existingColumn);
    if (indexColumn === -1)
        throw new CustomErrors_1.NotFoundError('Column not found');
    const columnNeedUpdate = dataBaseBoards[indexBoard].columns[indexColumn];
    dataBaseBoards[indexBoard].columns[indexColumn] = Object.assign(Object.assign({}, columnNeedUpdate), column);
};
exports.updateColumnById = updateColumnById;
const moveColumnToNewPlace = (columnId, newPlaceData) => {
    const columnToMove = (0, exports.searchColumn)(columnId);
    (0, exports.deleteColumnByID)(columnId);
    (0, Board_service_1.moveColumnInBoard)(columnToMove, newPlaceData);
};
exports.moveColumnToNewPlace = moveColumnToNewPlace;
const moveTaskInColumn = (taskToMove, newPlaceData) => {
    const { toColumnId, newPosition } = newPlaceData;
    const toColumn = (0, exports.searchColumn)(toColumnId);
    toColumn.tasks.splice(newPosition, 0, taskToMove);
};
exports.moveTaskInColumn = moveTaskInColumn;
