"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveColumnInBoard = exports.updateBoardById = exports.removeBoard = exports.searchBoardByColumnID = exports.searchBoard = exports.createNewBoard = void 0;
const uuid_1 = require("uuid");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const board_validate_1 = require("../../utils/board.validate");
const constants_1 = require("../../utils/constants");
const createNewBoard = (board) => {
    return new Promise((resolve) => {
        const idBoard = (0, uuid_1.v4)();
        const newBoard = Object.assign(Object.assign({}, board), { idBoard, columns: [] });
        const dataBase = (0, constants_1.getAllB)();
        dataBase.push(newBoard);
        resolve(newBoard);
    });
};
exports.createNewBoard = createNewBoard;
const searchBoard = (id) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    const dataBase = (0, constants_1.getAllB)();
    const correctBoard = dataBase.filter(board => board.idBoard == id);
    if (correctBoard.length < 1)
        throw new CustomErrors_1.NotExistBoardError(id);
    if (correctBoard.length > 1)
        throw new CustomErrors_1.CrashDataBaseError();
    if (correctBoard.length === 1)
        return correctBoard[0];
};
exports.searchBoard = searchBoard;
const searchBoardByColumnID = (columnId) => {
    if (!(0, uuid_1.validate)(columnId))
        throw new CustomErrors_1.InvalidUUIDError(columnId);
    const dataBase = (0, constants_1.getAllB)();
    return dataBase.find((board) => (board.columns.some((column) => column.idColumn === columnId)));
};
exports.searchBoardByColumnID = searchBoardByColumnID;
const removeBoard = (id) => {
    const existingBoard = (0, exports.searchBoard)(id);
    if (existingBoard) {
        const dataBase = (0, constants_1.getAllB)();
        const index = dataBase.indexOf(existingBoard);
        dataBase.splice(index, 1);
    }
};
exports.removeBoard = removeBoard;
const updateBoardById = (id, board) => {
    (0, board_validate_1.boardValidate)(board);
    const existingBoard = (0, exports.searchBoard)(id);
    if (existingBoard) {
        const dataBase = (0, constants_1.getAllB)();
        const index = dataBase.indexOf(existingBoard);
        dataBase[index] = Object.assign(Object.assign({}, dataBase[index]), board);
    }
};
exports.updateBoardById = updateBoardById;
const moveColumnInBoard = (columnToMove, newPlaceData) => {
    const { toBoardId, newPosition } = newPlaceData;
    const toBoard = (0, exports.searchBoard)(toBoardId);
    if (toBoard)
        toBoard.columns.splice(newPosition, 0, columnToMove);
};
exports.moveColumnInBoard = moveColumnInBoard;
