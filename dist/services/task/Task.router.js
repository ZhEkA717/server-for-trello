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
exports.moveTaskToColumn = exports.updateTask = exports.deleteTask = exports.createTask = exports.getAllTasksByIDS = exports.getTaskByID = void 0;
const uuid_1 = require("uuid");
const Task_service_1 = require("./Task.service");
const HandlerError_1 = require("../../Errors/HandlerError");
const constants_1 = require("../../utils/constants");
const CustomErrors_1 = require("../../Errors/CustomErrors");
const network_1 = require("../../utils/network");
const getTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.TASK_URL_ID}`.length);
        if (!taskId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Task ID not provided');
        const currentTask = (0, Task_service_1.searchTask)(taskId);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(currentTask));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getTaskByID = getTaskByID;
const getAllTasksByIDS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const urlArr = url === null || url === void 0 ? void 0 : url.split('/');
        if (!urlArr || urlArr.length > 2 || urlArr.length < 1)
            throw new CustomErrors_1.RequiredParametersNotProvided('Required IDs not provided');
        const boardId = urlArr[urlArr.length - 2];
        const columnId = urlArr[urlArr.length - 1];
        const tasks = (0, Task_service_1.searchTasks)(boardId, columnId);
        if (!tasks)
            throw new CustomErrors_1.NotFoundError('Tasks not found');
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(tasks));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.getAllTasksByIDS = getAllTasksByIDS;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith(constants_1.TASK_URL)))
            throw new CustomErrors_1.NotFoundError();
        if (!req.url)
            throw new CustomErrors_1.NotFoundError();
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const urlArr = req.url.split('/');
        const ids = urlArr.filter(uuid_1.validate);
        if (ids.length > 2 || ids.length < 1)
            throw new CustomErrors_1.NotFoundError();
        const [firstId, secondId] = ids;
        const columnId = secondId || firstId;
        const boardId = secondId ? firstId : undefined;
        const taskData = JSON.parse(req.bodyData);
        let newTask;
        if (boardId) {
            newTask = yield (0, Task_service_1.createNewTask)(taskData, boardId, columnId);
        }
        else {
            newTask = yield (0, Task_service_1.createNewTaskInColumn)(taskData, columnId);
        }
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(newTask));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.createTask = createTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url } = req;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.TASK_URL}`.length);
        if (!taskId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Task ID not provided');
        yield (0, Task_service_1.deleteTaskByIDS)(taskId);
        res.writeHead(204, network_1.commonJSONResponseHeaders);
        res.end();
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const data = req.bodyData;
        const { url } = req;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.TASK_URL}`.length);
        if (!taskId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Task ID not provided');
        const taskData = JSON.parse(data);
        yield (0, Task_service_1.updateTaskById)(taskId, taskData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(taskData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.updateTask = updateTask;
const moveTaskToColumn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.bodyData)
            throw new CustomErrors_1.NotFoundError();
        const data = req.bodyData;
        const { url } = req;
        const taskId = url === null || url === void 0 ? void 0 : url.substring(`/${constants_1.TASK_URL_MOVE}`.length);
        if (!taskId)
            throw new CustomErrors_1.RequiredParametersNotProvided('Task ID not provided');
        const taskData = JSON.parse(data);
        (0, Task_service_1.moveTaskToNewColumn)(taskId, taskData);
        res.writeHead(200, network_1.commonJSONResponseHeaders);
        res.end(JSON.stringify(taskData));
    }
    catch (err) {
        (0, HandlerError_1.HandleError)(req, res, err);
    }
});
exports.moveTaskToColumn = moveTaskToColumn;
