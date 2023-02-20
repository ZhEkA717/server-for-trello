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
const HandlerError_1 = require("../Errors/HandlerError");
const connect_1 = __importDefault(require("connect"));
const constants_1 = require("../utils/constants");
const Board_router_1 = require("../services/board/Board.router");
const Column_router_1 = require("../services/column/Column.router");
const Task_router_1 = require("../services/task/Task.router");
const CheckList_router_1 = require("../services/checkList/CheckList.router");
const network_1 = require("../utils/network");
const User_router_1 = require("../services/user/User.router");
const auth_1 = require("../middleware/auth");
const User_model_1 = require("../services/user/User.model");
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
const SERVER_CHECKLISTS = {
    GET: CheckList_router_1.getAllCheckBoxesByIDS,
    POST: CheckList_router_1.createCheckbox,
    DELETE: CheckList_router_1.deleteCheckbox,
    PUT: CheckList_router_1.updateCheckbox
};
const SERVER_USER = {
    GET: User_router_1.getUserInfo,
    POST: () => { },
    DELETE: () => { },
    PUT: User_router_1.updateUser,
};
const app = (0, connect_1.default)();
const addAuthorizationAndAuthentication = () => {
    const allAuthUsers = [User_model_1.AccessLevel.User, User_model_1.AccessLevel.Admin];
    const urls = [constants_1.BOARD_URL, constants_1.COLUMN_URL, constants_1.TASK_URL, constants_1.CHECKBOX_URL, constants_1.CHECKLIST_URL, constants_1.USER_URL];
    urls.forEach((url) => {
        app.use(url, auth_1.auth);
        // app.use(url, accessWithLevel(allAuthUsers));
    });
};
const createServer = (port = config_1.envConfig.SERVER_PORT) => {
    addAuthorizationAndAuthentication();
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
            else if (method === 'PUT' && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.CHECKLIST_URL))) {
                (0, CheckList_router_1.updateChecklist)(req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.CHECKBOX_URL)) {
                if (method === "GET" && (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.CHECKBOX_URL_ID)))
                    (0, CheckList_router_1.getCheckBoxByID)(req, res);
                else
                    yield SERVER_CHECKLISTS[method](req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.REGISTER_URL)) {
                if (method === 'POST')
                    (0, User_router_1.userRegistration)(req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.LOGIN_URL)) {
                if (method === 'POST')
                    (0, User_router_1.userLogin)(req, res);
            }
            else if (url === null || url === void 0 ? void 0 : url.startsWith(constants_1.USER_URL)) {
                SERVER_USER[method](req, res);
            }
            else {
                throw new CustomErrors_1.NotFoundError();
            }
        }
        catch (err) {
            (0, HandlerError_1.HandleError)(req, res, err);
        }
    }));
    const server = app.listen(port, () => {
        console.log(`Server running at port ${port}`);
    });
    return server;
};
exports.createServer = createServer;
