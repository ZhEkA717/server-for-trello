import { BadRequestError, ColumnBadRequestError, ColumnValidationError } from "../Errors/CustomErrors";
import { IColumn } from "../services/column/Column.model";

export const columnValidate = (column: IColumn) => {
    const requiredFields = ['nameColumn', 'descriptionColumn', 'tasks'].sort();
    const columnFields = Object.keys(column).sort();
    if (JSON.stringify(requiredFields) !== JSON.stringify(columnFields)) throw new BadRequestError('field');

    if (typeof column.nameColumn !== 'string') throw new ColumnBadRequestError(ColumnValidationError.nameColumn);
    if (typeof column.descriptionColumn !== 'string') throw new ColumnBadRequestError(ColumnValidationError.descriptionColumn);
    if (!Array.isArray(column.tasks)) throw new ColumnBadRequestError(ColumnValidationError.tasks);
}
