import { IBoard } from '../board/Board.model'; 
import { IColumn } from './Column.model';
import { v4, validate as validateUUID } from 'uuid';
import { InvalidUUIDError, NotExistUserError, CrashDataBaseError } from '../../Errors/CustomErrors';
import { columnValidate } from '../../utils/column.validate';
import { getAllB } from '../../utils/constants';

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
    const correctBoard = dataBaseBoards.filter(board=>{
        return board.columns.find(column=>column.idColumn === id)
    })
    if (correctBoard.length < 1) throw new NotExistUserError(id);
    if (correctBoard.length > 1) throw new CrashDataBaseError();
    return correctBoard[0];
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


