import { getAll, create,createNewColumn,createNewTask, remove, update, searchUser } from "./User.service";
import { RouterCallbackFunc } from "../Server/Server.types";
import { HandleError } from "../Errors/handler.error";
import { BASE_URL, BOARD_URL, COLUMN_URL, TASK_URL } from "../utils/constants";
import { NotFoundError } from "../Errors/CustomErrors";

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
// const create_column: RouterCallbackFunc = async (req, res) => {
//     if (req.url !== BOARD_URL) throw new NotFoundError();
//     let data = '';
//     req.on('data', (chunk) => (data += chunk))
//         .on('end', async () => {
//         let boardData;
//         try {
//             boardData = JSON.parse(data);
//             const newBoard = await createBoard(boardData);
//             console.log(newBoard);
//             res.writeHead(200, { 'Content-Type': 'application/json' });
//             res.end(JSON.stringify(newBoard));
//         } catch (err) {
//             HandleError(req, res, err);
//         }
//     })
// }

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

export { getAllUsers, createUser, createColumn,createTask, deleteUser, updateUser, getUserByID }

