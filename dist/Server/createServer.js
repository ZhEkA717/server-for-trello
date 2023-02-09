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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const config_1 = require("../common/config");
const CustomErrors_1 = require("../Errors/CustomErrors");
const handler_error_1 = require("../Errors/handler.error");
const connect_1 = __importDefault(require("connect"));
const constants_1 = require("../utils/constants");
const Board_router_1 = require("../services/board/Board.router");
const Column_router_1 = require("../services/column/Column.router");
const Task_router_1 = require("../services/task/Task.router");
const network_1 = require("../utils/network");
const User_router_1 = require("../services/user/User.router");
const auth_1 = require("../middleware/auth");
const SERVER_BOARDS = {
    GET: Board_router_1.getBoardByID,
    POST: Board_router_1.createBoard,
    DELETE: Board_router_1.deleteBoard,
    PUT: Board_router_1.updateBoard
};
const SERVER_COLUMNS = {
    GET: Column_router_1.getAllColumsByID,
    POST: Column_router_1.createColumn,
    DELETE: Column_router_1.deleteColumn,
    PUT: Column_router_1.updateColumn
};
const SERVER_TASKS = {
    GET: Task_router_1.getAllTasksByIDS,
    POST: Task_router_1.createTask,
    DELETE: Task_router_1.deleteTask,
    PUT: Task_router_1.updateTask
};
const app = (0, connect_1.default)();
const createServer = (port = config_1.envConfig.SERVER_PORT) => {
    app.use(auth_1.auth);
    app.use((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const method = req.method;
        const url = req.url;
        try {
            if (method === "OPTIONS")
                (0, network_1.preflightRequest)(req, res);
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.BOARD_URL)) {
                if (method === "GET" && url === constants_1.BOARD_URL)
                    yield (0, Board_router_1.getAllBoards)(req, res);
                else
                    yield SERVER_BOARDS[method](req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.COLUMN_URL)) {
                if (method === "GET" && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.COLUMN_URL_ID)))
                    yield (0, Column_router_1.getColumnByID)(req, res);
                else if (method === "PUT" && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.COLUMN_URL_MOVE)))
                    (0, Column_router_1.moveColumnToBoard)(req, res);
                else
                    yield SERVER_COLUMNS[method](req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.TASK_URL)) {
                if (method === "GET" && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.TASK_URL_ID)))
                    (0, Task_router_1.getTaskByID)(req, res);
                else if (method === "PUT" && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.TASK_URL_MOVE)))
                    (0, Task_router_1.moveTaskToColumn)(req, res);
                else
                    yield SERVER_TASKS[method](req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.REGISTER_URL)) {
                if (method === 'POST')
                    (0, User_router_1.userRegistration)(req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.LOGIN_URL)) {
                if (method === 'POST')
                    (0, User_router_1.userLogin)(req, res);
            }
            else {
                throw new CustomErrors_1.NotFoundError();
            }
        }
        catch (err) {
            (0, handler_error_1.HandleError)(req, res, err);
        }
    }));
    const server = app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
    return server;
};
exports.createServer = createServer;
