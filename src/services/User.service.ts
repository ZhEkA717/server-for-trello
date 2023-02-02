import { IUser } from '../services/User.model';
import { v4, validate as validateUUID } from 'uuid';
import { InvalidUUIDError, NotExistUserError, CrashDataBaseError } from '../Errors/CustomErrors';
import { userValidate } from '../utils/user.validate';

let dataBase: IUser[] = []

let dataBaseBoards = [
    {
        idBoard:'1',
        nameBoard: 'doska',
        descriptionBoard: 'description doska',
        columns: [
            {
                idColumn: '1',
                nameColumn: 'column',
                descriptionColumn: 'description column',
                tasks: [
                    {
                        idTask: '1',
                        nameTask: 'task1',
                        descriptionTask: 'description task1',
                    },
                    {
                        idTask: '2',
                        nameTask: 'task2',
                        descriptionTask: 'description task2',
                    }
                ]
            }
        ]
    }
]

const searchUser = (id: string) => {
    if (!validateUUID(id)) throw new InvalidUUIDError(id);
    const correctUser = dataBase.filter(user => user.id == id);
    if (correctUser.length < 1) throw new NotExistUserError(id);
    if (correctUser.length > 1) throw new CrashDataBaseError();
    if (correctUser.length === 1) return correctUser[0];
}

const getAll = () => dataBase;
const getAllB = () => dataBaseBoards;

const create = (user: IUser): Promise<IUser> => {
    userValidate(user);
    return new Promise((resolve) => {
        const id = v4();
        const newUser = { ...user, id };
        dataBase.push(newUser);
        resolve(newUser)
    })
}

const createNewColumn = (column: any, idBoard:string|undefined): Promise<any> => {
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
const createNewTask = (task: any, idBoard:string|undefined, idColumn:string|undefined): Promise<any> => {
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

const remove = (id: string) => {
    const existingUser = searchUser(id);
    const index = dataBase.indexOf(existingUser as IUser);
    dataBase.splice(index, 1);
};

const update = (id: string, user: IUser) => {
    userValidate(user);
    const existingUser = searchUser(id);
    const index = dataBase.indexOf(existingUser as IUser);
    dataBase[index] = { ...dataBase[index], ...user };
};

export { getAll,getAllB, create, createNewColumn,createNewTask, remove, update, searchUser };