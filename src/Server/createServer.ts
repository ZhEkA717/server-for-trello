import http from 'http';
import { envConfig } from '../common/config';
import { createUser,createColumn,createTask,
         deleteUser,deleteColumn,deleteTask,
         updateUser,updateColumn, 
         getUserByID, getAllUsers, getAllColumsByID,getAllTasksByIDS } from '../services/User.router';
import { MethodType } from './Server.types';
import { NotFoundError } from '../Errors/CustomErrors';
import { HandleError } from '../Errors/handler.error';
import { BASE_URL } from '../utils/constants';
import { BOARD_URL, COLUMN_URL, TASK_URL } from '../utils/constants';
import { createBoard, getAllBoards, deleteBoard, updateBoard } from '../services/board/Board.router';



const SERVER_BOARDS = {
    GET: getAllBoards,
    POST: createBoard,
    DELETE: deleteBoard,
    PUT: updateBoard
}
const SERVER_COLUMNS = {
    GET: getAllColumsByID,
    POST: createColumn,
    DELETE: deleteColumn,
    PUT: updateColumn
}
const SERVER_TASKS = {
    GET: getAllTasksByIDS,
    POST: createTask,
    DELETE: deleteTask,
    PUT: updateUser
}

export const createServer = (port = envConfig.SERVER_PORT) => {
    const server = http.createServer(async (req, res) => {
        const method = req.method as MethodType;
        const url: string | undefined = req.url;
        try {
            if(url?.startsWith(BOARD_URL)) {
                await SERVER_BOARDS[method](req, res)
            }
            if(url?.startsWith(COLUMN_URL)) {
                await SERVER_COLUMNS[method](req, res)
            }
            if(url?.startsWith(TASK_URL)) {
                await SERVER_TASKS[method](req, res)
            }
        } catch (err) {
            HandleError(req, res, err);
        }
    })
    server.listen(port, () => {
        console.log(`Server running at port ${port}`)
    });
    return server;
}


// const SERVER_ROUTES = {
//     GET: getUserByID,
//     POST: createUser,
//     DELETE: deleteUser,
//     PUT: updateUser
// }

// if (url?.startsWith(BASE_URL)) {
//     if (method === 'GET' && url === BASE_URL) await getAllUsers(req, res);
//     else {
//         await SERVER_ROUTES[method](req, res)
//     };
// }else {
//     throw new NotFoundError();
// }