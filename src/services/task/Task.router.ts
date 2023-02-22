import { validate as validateUUID } from 'uuid';
import {
    createNewTask,
    deleteTaskByIDS,
    updateTaskById,
    searchTask,
    searchTasks,
    moveTaskToNewColumn,
    createNewTaskInColumn,
} from './Task.service';
import { RouterCallbackFunc } from '../../Server/Server.types';
import { HandleError } from '../../Errors/HandlerError';
import { TASK_URL, TASK_URL_ID, TASK_URL_MOVE } from '../../utils/constants';
import { NotFoundError } from '../../Errors/CustomErrors';
import { commonJSONResponseHeaders } from '../../utils/network';
import { ICreateTask, ITask } from './Task.model';
import { NewPlaceColumn } from '../column/Column.model';

export const getTaskByID: RouterCallbackFunc = async (req, res) => {
    try {
        const { url } = req;
        const taskId = url?.substring(`/${TASK_URL_ID}`.length);
        const currentTask = searchTask(taskId as string);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(currentTask));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const getAllTasksByIDS: RouterCallbackFunc = async (req, res) => {
    try {
        const { url } = req;
        const urlArr: string[] | undefined = url?.split('/');

        if (!urlArr) throw new NotFoundError();

        const boardId: string = urlArr[urlArr.length - 2];
        const columnId: string = urlArr[urlArr.length - 1];
        const tasks: ITask[] | undefined = searchTasks(boardId, columnId);

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(tasks));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const createTask: RouterCallbackFunc = async (req, res) => {
    if (!req.url?.startsWith(TASK_URL)) throw new NotFoundError();
    if (!req.url) throw new NotFoundError();
    if (!req.bodyData) throw new NotFoundError();

    let taskData: ICreateTask;

    const urlArr: string[] = req.url.split('/');
    const ids: string[] = urlArr.filter(validateUUID);

    if (ids.length > 2 || ids.length < 1) throw new NotFoundError();

    const [firstId, secondId] = ids;

    const columnId = secondId || firstId;
    const boardId = secondId ? firstId : undefined;

    try {
        taskData = JSON.parse(req.bodyData);

        let newTask: ITask;
        if (boardId) {
            newTask = await createNewTask(taskData, boardId, columnId);
        } else {
            newTask = await createNewTaskInColumn(taskData, columnId);
        }

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(newTask));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const deleteTask: RouterCallbackFunc = async (req, res) => {
    try {
        const { url } = req;
        const taskId = url?.substring(`/${TASK_URL}`.length);
        await deleteTaskByIDS(taskId as string);
        res.writeHead(204, commonJSONResponseHeaders);
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const updateTask: RouterCallbackFunc = async (req, res) => {
    if (!req.bodyData) throw new NotFoundError();
    const data = req.bodyData;

    try {
        const taskData: ITask = JSON.parse(data);
        const { url } = req;
        if (!url) throw new NotFoundError();

        const taskId: string = url.substring(`/${TASK_URL}`.length);
        await updateTaskById(taskId, taskData);

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(taskData));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const moveTaskToColumn: RouterCallbackFunc = async (req, res) => {
    if (!req.bodyData) throw new NotFoundError();
    const data = req.bodyData;

    try {
        const taskData: NewPlaceColumn = JSON.parse(data);
        const { url } = req;
        if (!url) throw new NotFoundError();

        const taskId = url.substring(`/${TASK_URL_MOVE}`.length);

        moveTaskToNewColumn(taskId, taskData);

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(taskData));
    } catch (err) {
        HandleError(req, res, err);
    }
};
