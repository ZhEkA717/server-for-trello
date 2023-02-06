export interface ICreateTask {
    nameTask: string;
    descriptionTask: string;
};

export interface ITask extends ICreateTask {
    idTask: string;
};
