import { IBoard } from '../board/Board.model'; 
import { IColumn } from '../column/Column.model';
import { ICreateTask, ITask } from '../task/Task.model';
import { ICreateCheckBox, ICheckBox } from './CheckList.model';
import { v4, validate as validateUUID } from 'uuid';
import { InvalidUUIDError, NotExistUserError, CrashDataBaseError } from '../../Errors/CustomErrors';
import { checboxValidate } from '../../utils/checkbox.validate'; 
import { getAllB } from '../../utils/constants';

const dataBaseBoards = getAllB();

export const searchCheckbox = (id:string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    let correctCheckbox;
    dataBaseBoards.forEach(board=>{
        board.columns.forEach(column=>{
            column.tasks.forEach(task=>{
                task.checkLists.forEach(checkbox=>{
                    if(checkbox.idCheckBox === id){
                        correctCheckbox = checkbox;
                    }
                })
            });
        })
    })
    if (!correctCheckbox) throw new NotExistUserError(id);
    return correctCheckbox;
}

export const searchCheckLists = (idTask:string) => {
    if (!validateUUID(idTask)) throw new InvalidUUIDError(idTask);
    let checkLists;
    dataBaseBoards.forEach(board=>{
        board.columns.forEach(column=>{
            column.tasks.forEach(task=>{
                if(task.idTask === idTask){
                    checkLists = task.checkLists;
                }
            })
        })
    })
    return checkLists;
}

export const createNewCheckbox = (checkbox: ICreateCheckBox, idTask: string): Promise<any> => {
    return new Promise((resolve) => {
        const idCheckBox = v4();
        const newCheckbox = {
            ...checkbox,
            idCheckBox,
        }

        dataBaseBoards.forEach(board=>{
            board.columns.forEach(column=>{
                column.tasks.forEach(task=>{
                    if(task.idTask === idTask){
                        task.checkLists.push(newCheckbox);
                    }
                })
            })
        })
        
        resolve(newCheckbox);
    })
}

export const deleteCheckboxByID = (id: string) => {
    let boardIDX:any,
        columnIDX:any,
        taskIDX:any,
        checboxIDX:any;

    dataBaseBoards.forEach((board, boardIndex)=>{
        board.columns.forEach((column, columnIndex)=>{
            column.tasks.forEach((task, taskIndex)=>{
                task.checkLists.forEach((checkbox, checkboxIndex)=>{
                    if( checkbox.idCheckBox === id){
                        boardIDX = boardIndex;
                        columnIDX = columnIndex;
                        taskIDX = taskIndex;
                        checboxIDX = checkboxIndex;
                    }
                })
            })
        })
    })

    dataBaseBoards[boardIDX].columns[columnIDX].tasks[taskIDX].checkLists.splice(checboxIDX,1);
};

export const updateCheckboxById = (id: string, checkbox: ICheckBox) => {
    checboxValidate(checkbox);
    const currentUpdate: ICheckBox = searchCheckbox(id);

    let boardIDX: any,
        columnIDX: any,
        taskIDX: any,
        checboxIDX: any;

    dataBaseBoards.forEach((board, boardIndex) => {
        board.columns.forEach((column, columnIndex) => {
            column.tasks.forEach((task, taskIndex) => {
                task.checkLists.forEach((checkbox, checkboxIndex) => {
                    if (checkbox.idCheckBox === id) {
                        boardIDX = boardIndex;
                        columnIDX = columnIndex;
                        taskIDX = taskIndex;
                        checboxIDX = checkboxIndex;
                    }
                })
            })
        })
    })

    dataBaseBoards[boardIDX].columns[columnIDX].tasks[taskIDX].checkLists[checboxIDX] = {
        ...currentUpdate,
        nameCheckBox: checkbox.nameCheckBox
    }
};