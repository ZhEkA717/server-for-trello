import { NotFoundError } from '../../Errors/CustomErrors';
import { HandleError } from '../../Errors/HandlerError';
import { RouterCallbackFunc } from '../../Server/Server.types';
import { BOARD_URL } from '../../utils/constants';
import {
    createNewBoard,
    removeBoard,
    updateBoardById,
    searchBoard,
    getUserBoards,
} from './Board.service';
import { commonJSONResponseHeaders } from '../../utils/network';
import { IBoard } from './Board.model';

export const getAllBoards: RouterCallbackFunc = (req, res) => {
    if (!req.user) throw new NotFoundError();

    try {
        const userBoards: IBoard[] = getUserBoards(req.user);

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(userBoards));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const getBoardByID: RouterCallbackFunc = async (req, res) => {
    try {
        const { url } = req;
        const boardId = url?.substring(`/${BOARD_URL}`.length);
        const currentBoard = searchBoard(boardId as string);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(currentBoard));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const createBoard: RouterCallbackFunc = async (req, res) => {
    if (req.url !== BOARD_URL) throw new NotFoundError();
    if (!req.bodyData) throw new NotFoundError();
    if (!req.user) throw new NotFoundError();

    const data = req.bodyData;
    let boardData;

    try {
        boardData = JSON.parse(data);
        const newBoard = await createNewBoard(boardData, req.user);

        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(newBoard));
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const deleteBoard: RouterCallbackFunc = async (req, res) => {
    try {
        const { url } = req;
        const userId = url?.substring(`/${BOARD_URL}`.length);
        removeBoard(userId as string);
        res.writeHead(204, commonJSONResponseHeaders);
        res.end();
    } catch (err) {
        HandleError(req, res, err);
    }
};

export const updateBoard: RouterCallbackFunc = (req, res) => {
    if (!req.bodyData) throw new NotFoundError();
    const data = req.bodyData;

    let boardData;
    try {
        boardData = JSON.parse(data);
        const { url } = req;
        const boardId = url?.substring(`/${BOARD_URL}`.length);
        updateBoardById(boardId as string, boardData);
        res.writeHead(200, commonJSONResponseHeaders);
        res.end(JSON.stringify(boardData));
    } catch (err) {
        HandleError(req, res, err);
    }
};
