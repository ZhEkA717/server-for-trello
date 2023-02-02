import { v4 } from 'uuid';
import { getAllB } from './User.service';

export const createNewBoard = (board: any): Promise<any> => {
    return new Promise((resolve) => {
        const idBoard = v4();
        const newBoard = { ...board, idBoard, columns:[] };
        const dataBase = getAllB();
        dataBase.push(newBoard);
        resolve(newBoard)
    })
}