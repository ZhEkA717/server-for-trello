"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveTaskToNewColumn = exports.updateTaskById = exports.deleteTaskByIDS = exports.createNewTaskInColumn = exports.createNewTask = exports.searchTasks = exports.searchTask = void 0;
const uuid_1 = require("uuid");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const task_validate_1 = require("../../utils/task.validate");
const constants_1 = require("../../utils/constants");
const Column_service_1 = require("../column/Column.service");
const Board_service_1 = require("../board/Board.service");
const dataBaseBoards = (0, constants_1.getAllB)();
const searchTask = (id) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    let correctTask;
    dataBaseBoards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach((task) => {
                if (task.idTask === id)
                    correctTask = task;
            });
        });
    });
    if (!correctTask)
        throw new CustomErrors_1.NotExistUserError(id);
    return correctTask;
};
exports.searchTask = searchTask;
const searchTasks = (idBoard, idColumn) => {
    var _a, _b;
    if (!(0, uuid_1.validate)(idBoard))
        throw new CustomErrors_1.InvalidUUIDError(idBoard);
    if (!(0, uuid_1.validate)(idColumn))
        throw new CustomErrors_1.InvalidUUIDError(idColumn);
    return (_b = (_a = dataBaseBoards.find(board => board.idBoard === idBoard)) === null || _a === void 0 ? void 0 : _a.columns.find(column => column.idColumn === idColumn)) === null || _b === void 0 ? void 0 : _b.tasks;
};
exports.searchTasks = searchTasks;
const searchBoardWhichExistTask = (id) => {
    let correctBoard;
    dataBaseBoards.forEach(board => {
        board.columns.forEach(column => {
            column.tasks.forEach(task => {
                if (task.idTask === id)
                    correctBoard = board;
            });
        });
    });
    if (!correctBoard)
        throw new CustomErrors_1.NotExistUserError(id);
    return correctBoard;
};
const searchColumnWhichExistTask = (id, indexBoard) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    let correctColums;
    dataBaseBoards[indexBoard].columns.forEach(column => {
        column.tasks.find(task => {
            if (task.idTask === id)
                correctColums = column;
        });
    });
    if (!correctColums)
        throw new CustomErrors_1.NotExistUserError(id);
    return correctColums;
};
const createNewTask = (task, idBoard, idColumn) => {
    return new Promise((resolve) => {
        const board = dataBaseBoards.find(board => board.idBoard === idBoard);
        const column = board === null || board === void 0 ? void 0 : board.columns.find(column => column.idColumn === idColumn);
        const idTask = (0, uuid_1.v4)();
        const newTask = Object.assign(Object.assign({}, task), { idTask });
        board === null || board === void 0 ? void 0 : board.columns.forEach(item => {
            if (item.idColumn === (column === null || column === void 0 ? void 0 : column.idColumn)) {
                item.tasks.push(newTask);
            }
        });
        resolve(newTask);
    });
};
exports.createNewTask = createNewTask;
const createNewTaskInColumn = (task, idColumn) => {
    return new Promise((resolve, reject) => {
        const board = (0, Board_service_1.searchBoardByColumnID)(idColumn);
        if (board) {
            const column = board.columns.find(column => column.idColumn === idColumn);
            if (column) {
                const idTask = (0, uuid_1.v4)();
                const newTask = Object.assign(Object.assign({}, task), { idTask });
                column.tasks.push(newTask);
                resolve(newTask);
            }
            else {
                reject('Column not found');
            }
        }
        else {
            reject('Board not found');
        }
    });
};
exports.createNewTaskInColumn = createNewTaskInColumn;
const deleteTaskByIDS = (id) => {
    const existingTask = (0, exports.searchTask)(id);
    const existingBoard = searchBoardWhichExistTask(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard);
    const existingColumn = searchColumnWhichExistTask(id, indexBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn);
    const indexTask = existingColumn.tasks.indexOf(existingTask);
    dataBaseBoards[indexBoard].columns[indexColumn].tasks.splice(indexTask, 1);
};
exports.deleteTaskByIDS = deleteTaskByIDS;
const updateTaskById = (id, task) => {
    (0, task_validate_1.taskValidate)(task);
    const existingTask = (0, exports.searchTask)(id);
    const existingBoard = searchBoardWhichExistTask(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard);
    const existingColumn = searchColumnWhichExistTask(id, indexBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn);
    const indexTask = existingColumn.tasks.indexOf(existingTask);
    const taskNeedUpdate = dataBaseBoards[indexBoard].columns[indexColumn].tasks[indexTask];
    dataBaseBoards[indexBoard].columns[indexColumn].tasks[indexTask] = Object.assign(Object.assign({}, taskNeedUpdate), task);
};
exports.updateTaskById = updateTaskById;
const moveTaskToNewColumn = (taskId, newPlaceData) => {
    const taskToMove = (0, exports.searchTask)(taskId);
    (0, exports.deleteTaskByIDS)(taskId);
    (0, Column_service_1.moveTaskInColumn)(taskToMove, newPlaceData);
};
exports.moveTaskToNewColumn = moveTaskToNewColumn;
