"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnValidate = void 0;
const CustomErrors_1 = require("../Errors/CustomErrors");
const columnValidate = (column) => {
    const { nameColumn, descriptionColumn } = column;
    if (nameColumn && typeof column.nameColumn !== 'string')
        throw new CustomErrors_1.ColumnBadRequestError(CustomErrors_1.ColumnValidationError.nameColumn);
    if (descriptionColumn && typeof column.descriptionColumn !== 'string')
        throw new CustomErrors_1.ColumnBadRequestError(CustomErrors_1.ColumnValidationError.descriptionColumn);
};
exports.columnValidate = columnValidate;
