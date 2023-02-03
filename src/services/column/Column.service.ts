import { IBoard } from '../board/Board.model'; 
import { IColumn } from './Column.model';
import { v4, validate as validateUUID } from 'uuid';
import { InvalidUUIDError, NotExistUserError, CrashDataBaseError } from '../../Errors/CustomErrors';
import { columnValidate } from '../../utils/column.validate';
import { getAllB } from '../../utils/constants';
import { moveColumnInBoard } from '../board/Board.service';
import { ITask } from '../task/Task.model';


const dataBaseBoards = getAllB();

export const searchColumn = (id: string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    let correctColumn;
    
    dataBaseBoards.forEach(board => {
        board.columns.forEach(column => {
            if(column.idColumn === id) correctColumn = column;
        });
    });
    if (!correctColumn) throw new NotExistUserError(id);
    return correctColumn;
}
export const searchColumns = (id:string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    return dataBaseBoards.find(board=>board.idBoard === id)?.columns;
}

const searchBoardWhichExistColumn = (id: string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    let correctBoard:any;
    dataBaseBoards.forEach(board=>{
        board.columns.forEach(column=>{
            if(column.idColumn === id) correctBoard = board;
        })
    })
    if (!correctBoard) throw new NotExistUserError(id);
    return correctBoard;
}

export const createNewColumn = (column: any, idBoard:string|undefined): Promise<any> => {
    return new Promise((resolve) => {
        const board = dataBaseBoards.find(board=>board.idBoard === idBoard);
        const idColumn = v4();
        const newColumn = {
            ...column,
            idColumn,
            tasks:[]
        } 
        board?.columns.push(newColumn);
        resolve(newColumn);
    })
}

export const deleteColumnByID = (id: string) => {
    const existingColumn = searchColumn(id);
    const existingBoard = searchBoardWhichExistColumn(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard as IBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn as IColumn);

    dataBaseBoards[indexBoard].columns.splice(indexColumn,1);
};

export const updateColumnById = (id: string, column: IColumn) => {
    columnValidate(column);
    const existingColumn = searchColumn(id);
    const existingBoard = searchBoardWhichExistColumn(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard as IBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn as IColumn);
    const columnNeedUpdate = dataBaseBoards[indexBoard].columns[indexColumn];
    dataBaseBoards[indexBoard].columns[indexColumn] = {...columnNeedUpdate, ...column };
};

export const moveColumnToNewPlace = (
    columnId: string,
    newPlaceData: {
        toBoardId: string,
        newPosition: number
    }
): void => {
    const columnToMove: IColumn = searchColumn(columnId);

    deleteColumnByID(columnId);
    moveColumnInBoard(columnToMove, newPlaceData);
}

export const moveTaskInColumn = (
    taskToMove: ITask,
    newPlaceData: {
        toColumnId: string,
        newPosition: number,
    }
) => {
    const { toColumnId, newPosition } = newPlaceData;
    const toColumn: IColumn = searchColumn(toColumnId);

    toColumn.tasks.splice(newPosition, 0, taskToMove);
}

