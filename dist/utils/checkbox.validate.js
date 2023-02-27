"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checboxValidate = void 0;
const CustomErrors_1 = require("../Errors/CustomErrors");
const checboxValidate = (checbox) => {
    const { nameCheckBox } = checbox;
    if (nameCheckBox && typeof checbox.nameCheckBox !== 'string')
        throw new CustomErrors_1.CheckboxBadRequestError(CustomErrors_1.CheckboxValidationError.nameCheckBox);
};
exports.checboxValidate = checboxValidate;
