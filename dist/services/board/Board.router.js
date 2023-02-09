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
exports.updateBoard = exports.deleteBoard = exports.createBoard = exports.getBoardByID = exports.getAllBoards = void 0;
const CustomErrors_1 = require("../../Errors/CustomErrors");
const handler_error_1 = require("../../Errors/handler.error");
const constants_1 = require("../../utils/constants");
const Board_service_1 = require("./Board.service");
const constants_2 = require("../../utils/constants");
const network_1 = require("../../utils/network");
const getAllBoards = (req, res) => {
    try {
        const boards = (0, constants_2.getAllB)();
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(boards));
    }
    catch (err) {
        (0, handler_error_1.HandleError)(req, res, err);
    }
};
exports.getAllBoards = getAllBoards;
const getBoardByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const boardId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.BOARD_URL}`.length);
        const currentBoard = (0, Board_service_1.searchBoard)(boardId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(currentBoard));
    }
    catch (err) {
        (0, handler_error_1.HandleError)(req, res, err);
    }
});
exports.getBoardByID = getBoardByID;
const createBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.url !== constants_1.BOARD_URL)
        throw new CustomErrors_1.NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk))
        .on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        let boardData;
        try {
            boardData = JSON.parse(data);
            const newBoard = yield (0, Board_service_1.createNewBoard)(boardData);
            res.writeHead(200, network_1.commonJSONResponseHeaders);
            res.end(JSON.stringify(newBoard));
        }
        catch (err) {
            (0, handler_error_1.HandleError)(req, res, err);
        }
    }));
});
exports.createBoard = createBoard;
const deleteBoard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const url = req.url;
        const userId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.BOARD_URL}`.length);
        (0, Board_service_1.removeBoard)(userId);
        res.writeHead(204, network_1.commonJSONResponseHeaders);
        res.end();
    }
    catch (err) {
        (0, handler_error_1.HandleError)(req, res, err);
    }
});
exports.deleteBoard = deleteBoard;
const updateBoard = (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
        let boardData;
        try {
            boardData = JSON.parse(data);
            const url = req.url;
            const boardId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.BOARD_URL}`.length);
            (0, Board_service_1.updateBoardById)(boardId, boardData);
            res.writeHead(200, network_1.commonJSONResponseHeaders);
            res.end(JSON.stringify(boardData));
        }
        catch (err) {
            (0, handler_error_1.HandleError)(req, res, err);
        }
    }));
};
exports.updateBoard = updateBoard;
