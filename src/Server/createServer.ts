import http from 'http';
import { envConfig } from '../common/config';
import { MethodType } from './Server.types';
import { NotFoundError } from '../Errors/CustomErrors';
import { HandleError } from '../Errors/handler.error';
import { BOARD_URL, COLUMN_URL,COLUMN_URL_ID, COLUMN_URL_MOVE, TASK_URL, TASK_URL_ID } from '../utils/constants';
import { createBoard,getBoardByID, getAllBoards, deleteBoard, updateBoard } from '../services/board/Board.router';
import { createColumn, deleteColumn, updateColumn, getAllColumsByID,getColumnByID, moveColumnToBoard } from '../services/column/Column.router';
import { createTask, deleteTask, updateTask, getAllTasksByIDS, getTaskByID} from '../services/task/Task.router';

const SERVER_BOARDS = {
    GET: getBoardByID,
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
    PUT: updateTask
}

export const createServer = (port = envConfig.SERVER_PORT) => {
    const server = http.createServer(async (req, res) => {
        const method = req.method as MethodType;
        const url: string | undefined = req.url;
        try {
            if (url?.startsWith(BOARD_URL)) {
                if (method === "GET" && url === BOARD_URL) await getAllBoards(req, res)
                else await SERVER_BOARDS[method](req, res);
            } else if (url?.startsWith(COLUMN_URL)) {
                if (method === "GET" && url?.startsWith(COLUMN_URL_ID)) await getColumnByID(req, res)
                if (method === "PUT" && url?.startsWith(COLUMN_URL_MOVE)) moveColumnToBoard(req, res);
                else await SERVER_COLUMNS[method](req, res);
            } else if (url?.startsWith(TASK_URL)) {
                if (method === "GET" && url?.startsWith(TASK_URL_ID)) getTaskByID(req, res)
                else await SERVER_TASKS[method](req, res);
            }else{
                throw new NotFoundError();
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