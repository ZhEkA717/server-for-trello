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
exports.moveColumnToBoard = exports.updateColumn = exports.deleteColumn = exports.createColumn = exports.getAllColumsByID = exports.getColumnByID = void 0;
const Column_service_1 = require("./Column.service");
const HandlerError_1 = require("../../Errors/HandlerError");
const constants_1 = require("../../utils/constants");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const network_1 = require("../../utils/network");
const getColumnByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL_ID}`.length);
        if (!columnId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Column ID not provided');
        const currentCollumn = (0, Column_service_1.searchColumn)(columnId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(currentCollumn));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getColumnByID = getColumnByID;
const getAllColumsByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const boardId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
        if (!boardId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Board ID not provided');
        const columns = (0, Column_service_1.searchColumns)(boardId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(columns));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getAllColumsByID = getAllColumsByID;
const createColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.COLUMN_URL)))
            throw new CustomErrors_1.NotFoundError();
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const boardId = req.url.substring(`/${constants_1.COLUMN_URL}`.length);
        if (!boardId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Board ID not provided');
        const columnData = JSON.parse(req.bodyData);
        const newColumn = yield (0, Column_service_1.createNewColumn)(columnData, boardId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(newColumn));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.createColumn = createColumn;
const deleteColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
        if (!columnId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Column ID not provided');
        yield (0, Column_service_1.deleteColumnByID)(columnId);
        res.writeHead(204, network_1.commonJSONResponseHeaders);
        res.end();
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.deleteColumn = deleteColumn;
const updateColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const { url } = req;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
        if (!columnId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Column ID not provided');
        const columnData = JSON.parse(req.bodyData);
        yield (0, Column_service_1.updateColumnById)(columnId, columnData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(columnData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.updateColumn = updateColumn;
const moveColumnToBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const { url } = req;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL_MOVE}`.length);
        if (!columnId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Task ID not provided');
        const columnData = JSON.parse(req.bodyData);
        (0, Column_service_1.moveColumnToNewPlace)(columnId, columnData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(columnData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.moveColumnToBoard = moveColumnToBoard;
