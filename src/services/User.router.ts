import { getAll, create,createNewColumn,createNewTask, remove, update, searchUser,searchColumns,searchTasks, deleteColumnByID,updateColumnById,deleteTaskByIDS } from "./User.service";
import { RouterCallbackFunc } from "../Server/Server.types";
import { HandleError } from "../Errors/handler.error";
import { BASE_URL, BOARD_URL, COLUMN_URL, TASK_URL } from "../utils/constants";
import { NotFoundError } from "../Errors/CustomErrors";
// import { deleteColumnByID } from "./column/Column.service";

const getAllUsers: RouterCallbackFunc = async (req, res) => {
        try {
            const users = await getAll();
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(users));
        } catch (err) {
            HandleError(req, res, err);
        }
};
const getUserByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring(`/${BASE_URL}`.length);
        const currentUser = searchUser(userId as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(currentUser));
    } catch (err) {
        HandleError(req, res, err);
    }
}
const getAllColumsByID: RouterCallbackFunc = async (req, res) => {
        try {
            const url = req.url;
            const boardId = url?.substring(`/${COLUMN_URL}`.length);
            const columns = searchColumns(boardId as string);
            res.setHeader("Content-Type", "application/json");
            res.statusCode = 200;
            res.end(JSON.stringify(columns));
        } catch (err) {
            HandleError(req, res, err);
        }
};
const getAllTasksByIDS: RouterCallbackFunc = async (req, res) => {
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

const createUser: RouterCallbackFunc = async (req, res) => {
    if (req.url !== BASE_URL) throw new NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let userData;
        try {
            userData = JSON.parse(data);
            const newUser = await create(userData);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newUser));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}

const createColumn: RouterCallbackFunc = async (req, res) => {
    if (!req.url?.startsWith(COLUMN_URL)) throw new NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk))
        .on('end', async () => {
        let columnData;
        const boardId = req.url?.substring(`/${COLUMN_URL}`.length);
        try {
            columnData = JSON.parse(data);
            const newColumn = await createNewColumn(columnData,boardId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newColumn));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}

const createTask: RouterCallbackFunc = async (req, res) => {
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
const deleteUser: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring(`/${BASE_URL}`.length);
        await remove(userId as string);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}
const deleteColumn: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const columnId = url?.substring(`/${COLUMN_URL}`.length);
        await deleteColumnByID(columnId as string);
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}
const deleteTask: RouterCallbackFunc = async (req, res) => {
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

const updateUser: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let userData;
        try {
            userData = JSON.parse(data);
            const url = req.url;
            const userId = url?.substring(`/${BASE_URL}`.length);
            await update(userId as string, userData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(userData));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}
const updateColumn: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let columnData;
        try {
            columnData = JSON.parse(data);
            const url = req.url;
            const columnId = url?.substring(`/${COLUMN_URL}`.length);
            await updateColumnById(columnId as string, columnData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(columnData));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}



export { getAllUsers,getAllColumsByID,getAllTasksByIDS, createUser, createColumn,createTask, deleteUser,deleteColumn,deleteTask, updateUser,updateColumn, getUserByID }

