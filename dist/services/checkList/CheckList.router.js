"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateChecklist = exports.updateCheckbox = exports.deleteCheckbox = exports.createCheckbox = exports.getAllCheckBoxesByIDS = exports.getCheckBoxByID = void 0;
const CheckList_service_1 = require("./CheckList.service");
const HandlerError_1 = require("../../Errors/HandlerError");
const constants_1 = require("../../utils/constants");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const network_1 = require("../../utils/network");
const getCheckBoxByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const checkboxId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.CHECKBOX_URL_ID}`.length);
        const currentCheckbox = (0, CheckList_service_1.searchCheckbox)(checkboxId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(currentCheckbox));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getCheckBoxByID = getCheckBoxByID;
const getAllCheckBoxesByIDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.CHECKBOX_URL}`.length);
        const checkLists = (0, CheckList_service_1.searchCheckLists)(taskId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(checkLists));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getAllCheckBoxesByIDS = getAllCheckBoxesByIDS;
const createCheckbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.CHECKBOX_URL)))
        throw new CustomErrors_1.NotFoundError();
    if (!req.bodyData)
        throw new CustomErrors_1.NotFoundError();
    let data = req.bodyData;
    let checkboxData;
    const taskId = (_b = req.url) === null || _b === void 0 ? void 0 : _b.substring(`/${constants_1.CHECKBOX_URL}`.length);
    try {
        checkboxData = JSON.parse(data);
        const newCheckbox = yield (0, CheckList_service_1.createNewCheckbox)(checkboxData, taskId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(newCheckbox));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.createCheckbox = createCheckbox;
const deleteCheckbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const checkboxId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.CHECKBOX_URL}`.length);
        yield (0, CheckList_service_1.deleteCheckboxByID)(checkboxId);
        res.writeHead(204, network_1.commonJSONResponseHeaders);
        res.end();
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.deleteCheckbox = deleteCheckbox;
const updateCheckbox = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.bodyData)
        throw new CustomErrors_1.NotFoundError();
    let data = req.bodyData;
    let checkboxData;
    try {
        checkboxData = JSON.parse(data);
        const url = req.url;
        const checkboxId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.CHECKBOX_URL}`.length);
        yield (0, CheckList_service_1.updateCheckboxById)(checkboxId, checkboxData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(checkboxData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.updateCheckbox = updateCheckbox;
const updateChecklist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.bodyData)
        throw new CustomErrors_1.NotFoundError();
    let data = req.bodyData;
    let checklistData;
    try {
        checklistData = JSON.parse(data);
        const url = req.url;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.CHECKLIST_URL}`.length);
        yield (0, CheckList_service_1.updateChecklistById)(taskId, checklistData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(checklistData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.updateChecklist = updateChecklist;
