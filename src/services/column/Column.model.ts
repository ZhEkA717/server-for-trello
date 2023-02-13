export interface IColumn {
        idColumn: string;
        nameColumn: string;
        descriptionColumn: string;
        tasks: {
            idTask: string;
            nameTask: string;
            descriptionTask: string;
            checkLists:{
                idCheckBox: string;
                nameCheckBox: string;
            }[]
        }[];
};
