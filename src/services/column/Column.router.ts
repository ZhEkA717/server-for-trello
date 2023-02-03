import { createNewColumn,deleteColumnByID,updateColumnById, searchColumns, searchColumn, moveColumnToNewPlace } from "./Column.service";
import { RouterCallbackFunc } from "../../Server/Server.types";
import { HandleError } from "../../Errors/Handler.error";
import { COLUMN_URL, COLUMN_URL_ID, COLUMN_URL_MOVE } from "../../utils/constants";
import { NotFoundError } from "../../Errors/CustomErrors";


export const getColumnByID: RouterCallbackFunc = async (req, res) => {
    try {
        const url = req.url;
        const columnId = url?.substring(`/${COLUMN_URL_ID}`.length);
        const currentCollumn = searchColumn(columnId as string);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(currentCollumn));
    } catch (err) {
        HandleError(req, res, err);
    }
}

export const getAllColumsByID: RouterCallbackFunc = async (req, res) => {
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

export const createColumn: RouterCallbackFunc = async (req, res) => {
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

export const deleteColumn: RouterCallbackFunc = async (req, res) => {
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

export const updateColumn: RouterCallbackFunc = async (req, res) => {
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

export const moveColumnToBoard: RouterCallbackFunc = async (req, res) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', async () => {
        let columnData;
        try {
            columnData = JSON.parse(data);
            const url = req.url;
            const taskId = url?.substring(`/${COLUMN_URL_MOVE}`.length);

            moveColumnToNewPlace(taskId as string, columnData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(columnData));
        } catch (err) {
            HandleError(req, res, err);
        }
    })
};
