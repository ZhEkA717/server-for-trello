"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskValidate = void 0;
const CustomErrors_1 = require("../Errors/CustomErrors");
const taskValidate = (task) => {
    const { nameTask, descriptionTask } = task;
    if (nameTask && typeof task.nameTask !== 'string')
        throw new CustomErrors_1.TaskBadRequestError(CustomErrors_1.TaskValidationError.nameTask);
    if (descriptionTask && typeof task.descriptionTask !== 'string')
        throw new CustomErrors_1.TaskBadRequestError(CustomErrors_1.TaskValidationError.descriptionTask);
};
exports.taskValidate = taskValidate;
