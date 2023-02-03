import { createNewTask,deleteTaskByIDS,updateTaskById, searchTask,searchTasks } from "./Task.service";
import { RouterCallbackFunc } from "../../Server/Server.types";
import { HandleError } from "../../Errors/handler.error";
import { TASK_URL, TASK_URL_ID } from "../../utils/constants";
import { NotFoundError } from "../../Errors/CustomErrors";

export const getTaskByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const taskId = url?.substring(`/${TASK_URL_ID}`.length);
        const currentTask = searchTask(taskId as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(currentTask));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const getAllTasksByIDS: RouterCallbackFunc = async (req, res) => {
        try {
            const url = req.url;
            const urlArr:any = url?.split('/');
            const boardId = urlArr[urlArr.length -2];
            const columnId = urlArr[urlArr.length -1];
            const tasks = searchTasks(boardId as string,columnId as string);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(tasks));
        } catch (err) {
            HandleError(req, res, err);
        }
};

export const createTask: RouterCallbackFunc = async (req, res) => {
    if (!req.url?.startsWith(TASK_URL)) throw new NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk))
        .on('end', async () => {
        let taskData;
        const urlArr:any = req.url?.split('/');
        const boardId = urlArr[urlArr.length-2];
        const columnId = urlArr[urlArr.length-1];
        try {
            taskData = JSON.parse(data);
            const newTask = await createNewTask(taskData,boardId,columnId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newTask));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}

export const deleteTask: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const taskId = url?.substring(`/${TASK_URL}`.length);
        await deleteTaskByIDS(taskId as string);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const updateTask: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let taskData;
        try {
            taskData = JSON.parse(data);
            const url = req.url;
            const taskId = url?.substring(`/${TASK_URL}`.length);
            await updateTaskById(taskId as string, taskData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(taskData));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}




