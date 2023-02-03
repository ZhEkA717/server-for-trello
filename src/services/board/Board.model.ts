export interface IBoard {
    idBoard: string;
    nameBoard: string;
    descriptionBoard: string;
    columns: {
        idColumn: string;
        nameColumn: string;
        descriptionColumn: string;
        tasks: {
            idTask: string;
            nameTask: string;
            descriptionTask: string;
        }[];
    }[];
};
