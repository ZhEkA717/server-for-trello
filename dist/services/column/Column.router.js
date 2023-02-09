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
const Handler_error_1 = require("../../Errors/Handler.error");
const constants_1 = require("../../utils/constants");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const network_1 = require("../../utils/network");
const getColumnByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL_ID}`.length);
        const currentCollumn = (0, Column_service_1.searchColumn)(columnId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(currentCollumn));
    }
    catch (err) {
        (0, Handler_error_1.HandleError)(req, res, err);
    }
});
exports.getColumnByID = getColumnByID;
const getAllColumsByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const boardId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
        const columns = (0, Column_service_1.searchColumns)(boardId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(columns));
    }
    catch (err) {
        (0, Handler_error_1.HandleError)(req, res, err);
    }
});
exports.getAllColumsByID = getAllColumsByID;
const createColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.COLUMN_URL)))
        throw new CustomErrors_1.NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk))
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        let columnData;
        const boardId = (_b = req.url) === null || _b === void 0 ? void 0 : _b.substring(`/${constants_1.COLUMN_URL}`.length);
        try {
            columnData = JSON.parse(data);
            const newColumn = yield (0, Column_service_1.createNewColumn)(columnData, boardId);
            res.writeHead(200, network_1.commonJSONResponseHeaders);
            res.end(JSON.stringify(newColumn));
        }
        catch (err) {
            (0, Handler_error_1.HandleError)(req, res, err);
        }
    }));
});
exports.createColumn = createColumn;
const deleteColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
        yield (0, Column_service_1.deleteColumnByID)(columnId);
        res.writeHead(204, network_1.commonJSONResponseHeaders);
        res.end();
    }
    catch (err) {
        (0, Handler_error_1.HandleError)(req, res, err);
    }
});
exports.deleteColumn = deleteColumn;
const updateColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        let columnData;
        try {
            columnData = JSON.parse(data);
            const url = req.url;
            const columnId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL}`.length);
            yield (0, Column_service_1.updateColumnById)(columnId, columnData);
            res.writeHead(200, network_1.commonJSONResponseHeaders);
            res.end(JSON.stringify(columnData));
        }
        catch (err) {
            (0, Handler_error_1.HandleError)(req, res, err);
        }
    }));
});
exports.updateColumn = updateColumn;
const moveColumnToBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        let columnData;
        try {
            columnData = JSON.parse(data);
            const url = req.url;
            const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.COLUMN_URL_MOVE}`.length);
            (0, Column_service_1.moveColumnToNewPlace)(taskId, columnData);
            res.writeHead(200, network_1.commonJSONResponseHeaders);
            res.end(JSON.stringify(columnData));
        }
        catch (err) {
            (0, Handler_error_1.HandleError)(req, res, err);
        }
    }));
});
exports.moveColumnToBoard = moveColumnToBoard;
