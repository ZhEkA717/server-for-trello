import { BadRequestError, ColumnBadRequestError, ColumnValidationError,TaskBadRequestError, TaskValidationError } from "../Errors/CustomErrors";
import { IUser } from "../services/User.model";
import { IColumn } from "../services/column/Column.model";
import { ITask } from "../services/task/Task.model"; 

const userValidate = (user: IUser) => {
    const requiredFields = ['username', 'age', 'hobbies'].sort();
    const userFields = Object.keys(user).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(userFields)) throw new BadRequestError('field');

    if (typeof user.username !== 'string') throw new BadRequestError('username');
    if (typeof user.age !== 'number') throw new BadRequestError('age');
    if (!Array.isArray(user.hobbies)) throw new BadRequestError('hobbies');

    for (let i = 0; i < user.hobbies.length; i++) {
        if (typeof user.hobbies[i] !== 'string') throw new BadRequestError('hobbiesArray')
    }
}


export const columnValidate = (column: IColumn) => {
    const requiredFields = ['nameColumn', 'descriptionColumn', 'tasks'].sort();
    const columnFields = Object.keys(column).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(columnFields)) throw new BadRequestError('field');

    if (typeof column.nameColumn !== 'string') throw new ColumnBadRequestError(ColumnValidationError.nameColumn);
    if (typeof column.descriptionColumn !== 'string') throw new ColumnBadRequestError(ColumnValidationError.descriptionColumn);
    if (!Array.isArray(column.tasks)) throw new ColumnBadRequestError(ColumnValidationError.tasks);
}
export const taskValidate = (task: ITask) => {
    const requiredFields = ['nameTask', 'descriptionTask'].sort();
    const taskFields = Object.keys(task).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(taskFields)) throw new BadRequestError('field');

    if (typeof task.nameTask !== 'string') throw new TaskBadRequestError(TaskValidationError.nameTask);
    if (typeof task.descriptionTask !== 'string') throw new TaskBadRequestError(TaskValidationError.descriptionTask);
}
export { userValidate }