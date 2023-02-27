import { v4, validate as validateUUID } from 'uuid';
import {
    CrashDataBaseError,
    InvalidUUIDError,
    NotExistBoardError,
} from '../../Errors/CustomErrors';
import { boardValidate } from '../../utils/board.validate';
import { CreateBoard, IBoard } from './Board.model';
import { getAllB } from '../../utils/constants';
import { IColumn } from '../column/Column.model';
import { IUser } from '../user/User.model';

export const createNewBoard = (board: CreateBoard, owner: IUser): Promise<IBoard> =>
    new Promise((resolve) => {
        const idBoard = v4();
        const newBoard: IBoard = {
            ...board,
            idBoard,
            columns: [],
            ownerId: owner.id,
        };

        const dataBase = getAllB();
        dataBase.push(newBoard);

        resolve(newBoard);
    });

export const searchBoard = (id: string): IBoard | undefined => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    const dataBase = getAllB();

    const correctBoard = dataBase.filter((board) => board.idBoard === id);

    if (correctBoard.length < 1) throw new NotExistBoardError(id);
    if (correctBoard.length > 1) throw new CrashDataBaseError();
    if (correctBoard.length === 1) return correctBoard[0];

    return undefined;
};

export const searchBoardByColumnID = (columnId: string): IBoard | undefined => {
    if (!validateUUID(columnId)) throw new InvalidUUIDError(columnId);
    const dataBase = getAllB();

    return dataBase.find((board: IBoard) =>
        board.columns.some((column: IColumn) => column.idColumn === columnId),
    );
};

export const removeBoard = (id: string): void => {
    const existingBoard: IBoard | undefined = searchBoard(id);

    if (existingBoard) {
        const dataBase = getAllB();
        const index: number = dataBase.indexOf(existingBoard);
        dataBase.splice(index, 1);
    }
};

export const updateBoardById = (id: string, board: IBoard) => {
    boardValidate(board);
    const existingBoard: IBoard | undefined = searchBoard(id);
    if (existingBoard) {
        const dataBase: IBoard[] = getAllB();
        const index = dataBase.indexOf(existingBoard);
        dataBase[index] = { ...dataBase[index], ...board };
    }
};

export const moveColumnInBoard = (
    columnToMove: IColumn,
    newPlaceData: {
        toBoardId: string;
        newPosition: number;
    },
): void => {
    const { toBoardId, newPosition } = newPlaceData;
    const toBoard: IBoard | undefined = searchBoard(toBoardId);

    if (toBoard) toBoard.columns.splice(newPosition, 0, columnToMove);
};

export const getUserBoards = (owner: IUser): IBoard[] => {
    const dataBase = getAllB();
    return dataBase.filter((board: IBoard) => board.ownerId === owner.id);
};
