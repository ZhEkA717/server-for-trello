import { NotFoundError } from "../../Errors/CustomErrors";
import { HandleError } from "../../Errors/HandlerError";
import { RouterCallbackFunc } from "../../Server/Server.types";
import { BOARD_URL } from "../../utils/constants";
import { createNewBoard, removeBoard, updateBoardById, searchBoard } from "./Board.service";
import { getAllB } from "../../utils/constants";
import { commonJSONResponseHeaders } from "../../utils/network";

export const getAllBoards: RouterCallbackFunc = (req, res) => {
    try {
        const boards = getAllB();

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(boards));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const getBoardByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const boardId = url?.substring(`/${BOARD_URL}`.length);
        const currentBoard = searchBoard(boardId as string);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(currentBoard));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const createBoard: RouterCallbackFunc = async (req, res) => {
    if (req.url !== BOARD_URL) throw new NotFoundError();
    let data = '';
    req.on('data', (chunk) => (data += chunk))
        .on('end', async () => {
        let boardData;
        try {
            boardData = JSON.parse(data);
            const newBoard = await createNewBoard(boardData);
            res.writeHead(200, commonJSONResponseHeaders);
            res.end(JSON.stringify(newBoard));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}

export const deleteBoard: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const userId = url?.substring(`/${BOARD_URL}`.length);
        removeBoard(userId as string);
        res.writeHead(204, commonJSONResponseHeaders);
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const updateBoard: RouterCallbackFunc = (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let boardData;
        try {
            boardData = JSON.parse(data);
            const url = req.url;
            const boardId = url?.substring(`/${BOARD_URL}`.length);
            updateBoardById(boardId as string, boardData);
            res.writeHead(200, commonJSONResponseHeaders);
            res.end(JSON.stringify(boardData));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
}
