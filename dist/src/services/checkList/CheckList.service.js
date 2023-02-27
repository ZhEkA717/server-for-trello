"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChecklistById = exports.updateCheckboxById = exports.deleteCheckboxByID = exports.createNewCheckbox = exports.searchCheckLists = exports.searchCheckbox = void 0;
const uuid_1 = require("uuid");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const checkbox_validate_1 = require("../../utils/checkbox.validate");
const constants_1 = require("../../utils/constants");
const dataBaseBoards = (0, constants_1.getAllB)();
const searchCheckbox = (id) => {
    if (!(0, uuid_1.validate)(id))
        throw new CustomErrors_1.InvalidUUIDError(id);
    let correctCheckbox;
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks.forEach((task) => {
                task.checkLists.forEach((checkbox) => {
                    if (checkbox.idCheckBox === id) {
                        correctCheckbox = checkbox;
                    }
                });
            });
        });
    });
    if (!correctCheckbox)
        throw new CustomErrors_1.NotExistError(CustomErrors_1.ElementTypes.CHECKBOX, id);
    return correctCheckbox;
};
exports.searchCheckbox = searchCheckbox;
const searchCheckLists = (idTask) => {
    if (!(0, uuid_1.validate)(idTask))
        throw new CustomErrors_1.InvalidUUIDError(idTask);
    let checkLists;
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks.forEach((task) => {
                if (task.idTask === idTask) {
                    checkLists = task.checkLists;
                }
            });
        });
    });
    if (!checkLists)
        throw new CustomErrors_1.NotExistError(CustomErrors_1.ElementTypes.CHECKLIST, idTask);
    return checkLists;
};
exports.searchCheckLists = searchCheckLists;
const createNewCheckbox = (checkbox, idTask) => new Promise((resolve) => {
    const idCheckBox = (0, uuid_1.v4)();
    const newCheckbox = Object.assign(Object.assign({}, checkbox), { idCheckBox });
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks.forEach((task) => {
                if (task.idTask === idTask) {
                    task.checkLists.push(newCheckbox);
                }
            });
        });
    });
    resolve(newCheckbox);
});
exports.createNewCheckbox = createNewCheckbox;
const deleteCheckboxByID = (id) => {
    let boardIDX;
    let columnIDX;
    let taskIDX;
    let checboxIDX;
    dataBaseBoards.forEach((board, boardIndex) => {
        board.columns.forEach((column, columnIndex) => {
            column.tasks.forEach((task, taskIndex) => {
                task.checkLists.forEach((checkbox, checkboxIndex) => {
                    if (checkbox.idCheckBox === id) {
                        boardIDX = boardIndex;
                        columnIDX = columnIndex;
                        taskIDX = taskIndex;
                        checboxIDX = checkboxIndex;
                    }
                });
            });
        });
    });
    if (boardIDX && columnIDX && taskIDX && checboxIDX) {
        dataBaseBoards[boardIDX].columns[columnIDX].tasks[taskIDX].checkLists.splice(checboxIDX, 1);
    }
};
exports.deleteCheckboxByID = deleteCheckboxByID;
const updateCheckboxById = (id, checkbox) => {
    (0, checkbox_validate_1.checboxValidate)(checkbox);
    const currentUpdate = (0, exports.searchCheckbox)(id);
    let boardIDX;
    let columnIDX;
    let taskIDX;
    let checboxIDX;
    dataBaseBoards.forEach((board, boardIndex) => {
        board.columns.forEach((column, columnIndex) => {
            column.tasks.forEach((task, taskIndex) => {
                task.checkLists.forEach((checkboxItem, checkboxIndex) => {
                    if (checkboxItem.idCheckBox === id) {
                        boardIDX = boardIndex;
                        columnIDX = columnIndex;
                        taskIDX = taskIndex;
                        checboxIDX = checkboxIndex;
                    }
                });
            });
        });
    });
    if (boardIDX && columnIDX && taskIDX && checboxIDX) {
        dataBaseBoards[boardIDX].columns[columnIDX].tasks[taskIDX].checkLists[checboxIDX] = Object.assign(Object.assign({}, currentUpdate), { nameCheckBox: checkbox.nameCheckBox, isChoose: checkbox.isChoose });
    }
};
exports.updateCheckboxById = updateCheckboxById;
const updateChecklistById = (taskId, checklist) => {
    dataBaseBoards.forEach((board) => {
        board.columns.forEach((column) => {
            column.tasks.forEach((task) => {
                if (task.idTask === taskId) {
                    task.checkLists = checklist;
                }
            });
        });
    });
};
exports.updateChecklistById = updateChecklistById;
