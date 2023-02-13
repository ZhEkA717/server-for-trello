export interface ICreateTask {
    nameTask: string;
    descriptionTask: string;
    checkLists: {
        idCheckBox: string;
        nameCheckBox: string;
        isChoose: boolean;
    }[]
};

export interface ITask extends ICreateTask {
    idTask: string;
};
