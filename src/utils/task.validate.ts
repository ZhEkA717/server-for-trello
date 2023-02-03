import { BadRequestError,TaskBadRequestError, TaskValidationError } from "../Errors/CustomErrors";
import { ITask } from "../services/task/Task.model"; 

export const taskValidate = (task: ITask) => {
    const requiredFields = ['nameTask', 'descriptionTask'].sort();
    const taskFields = Object.keys(task).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(taskFields)) throw new BadRequestError('field');

    if (typeof task.nameTask !== 'string') throw new TaskBadRequestError(TaskValidationError.nameTask);
    if (typeof task.descriptionTask !== 'string') throw new TaskBadRequestError(TaskValidationError.descriptionTask);
}