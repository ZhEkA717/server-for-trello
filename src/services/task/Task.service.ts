import { IBoard } from '../board/Board.model'; 
import { IColumn } from '../column/Column.model';
import { ITask } from './Task.model';
import { v4, validate as validateUUID } from 'uuid';
import { InvalidUUIDError, NotExistUserError, CrashDataBaseError } from '../../Errors/CustomErrors';
import { taskValidate } from '../../utils/task.validate';
import { getAllB } from '../../utils/constants';
import { searchColumn } from '../column/Column.service';

const dataBaseBoards = getAllB();

export const searchTask = (id:string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    let correctTask;
    dataBaseBoards.forEach(board=>{
        board.columns.forEach(column=>{
            column.tasks.forEach((task)=>{
                if(task.idTask === id) correctTask = task;
            });
        })
    })
    if (!correctTask) throw new NotExistUserError(id);
    return correctTask;
}

export const searchTasks = (idBoard:string, idColumn:string) => {
    if (!validateUUID(idBoard)) throw new InvalidUUIDError(idBoard);
    if (!validateUUID(idColumn)) throw new InvalidUUIDError(idColumn);
    return dataBaseBoards.find(board=>board.idBoard === idBoard)
        ?.columns.find(column=>column.idColumn === idColumn)
        ?.tasks;
}

// const searchBoardWhichExistTask = (id: string) => {
//     if (!validateUUID(id)) throw new InvalidUUIDError(id);
//     const correctBoard = dataBaseBoards.filter(board=>{
//         return board.columns.filter(column=>{
//             column.tasks.find(task=> task.idTask === id);
//         })
//     })
//     if (correctBoard.length < 1) throw new NotExistUserError(id);
//     if (correctBoard.length > 1) throw new CrashDataBaseError();
//     return correctBoard[0];
// }
const searchBoardWhichExistTask = (id:string) => {
    let correctBoard:any; 
    dataBaseBoards.forEach(board=>{
        board.columns.forEach(column=>{
          column.tasks.forEach(task=>{
            if(task.idTask === id) correctBoard = board;
          });
        })
    })
    if (!correctBoard) throw new NotExistUserError(id);
    return correctBoard;
}
const searchColumnWhichExistTask = (id: string, indexBoard:number) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    let correctColums:any; 
    dataBaseBoards[indexBoard].columns.forEach(column=>{
        column.tasks.find(task=>{
            if(task.idTask === id) correctColums = column;
        });
    })
    if (!correctColums) throw new NotExistUserError(id);
    return correctColums;
}

export const createNewTask = (task: any, idBoard:string|undefined, idColumn:string|undefined): Promise<any> => {
    return new Promise((resolve) => {
        const board = dataBaseBoards.find(board=>board.idBoard === idBoard);
        const column = board?.columns.find(column=>column.idColumn === idColumn);;
        const idTask = v4();
        const newTask = {
            ...task,
            idTask,
        }
        board?.columns.forEach(item=>{
            if(item.idColumn === column?.idColumn){
                item.tasks.push(newTask)
            }
        });
        resolve(newTask);
    })
}

export const deleteTaskByIDS = (id:string) => {
    const existingTask = searchTask(id);
    const existingBoard = searchBoardWhichExistTask(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard as IBoard);
    const existingColumn = searchColumnWhichExistTask(id,indexBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn as IColumn);
    const indexTask = existingColumn.tasks.indexOf(existingTask as ITask);

    dataBaseBoards[indexBoard].columns[indexColumn].tasks.splice(indexTask,1);
};

export const updateTaskById = (id: string, task: ITask) => {
    taskValidate(task);
    const existingTask = searchTask(id);
    const existingBoard = searchBoardWhichExistTask(id);
    const indexBoard = dataBaseBoards.indexOf(existingBoard as IBoard);
    const existingColumn = searchColumnWhichExistTask(id,indexBoard);
    const indexColumn = existingBoard.columns.indexOf(existingColumn as IColumn);
    const indexTask = existingColumn.tasks.indexOf(existingTask as ITask);
    const taskNeedUpdate = dataBaseBoards[indexBoard].columns[indexColumn].tasks[indexTask];
    dataBaseBoards[indexBoard].columns[indexColumn].tasks[indexTask] = {...taskNeedUpdate, ...task};
};

export const moveTaskToNewColumn = (
    taskId: string,
    newPlaceData: {
        toColumnId: string,
        newPosition: number,
    }
): void => {
    const { toColumnId, newPosition } = newPlaceData;
    const taskToMove: ITask = searchTask(taskId);
    const toColumn: IColumn = searchColumn(toColumnId);

    deleteTaskByIDS(taskId);
    toColumn.tasks.splice(newPosition, 0, taskToMove);
}
