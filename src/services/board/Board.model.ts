import { IColumn } from "../column/Column.model";

export interface IBoard {
    idBoard: string;
    nameBoard: string;
    dateBoard: Date;
    descriptionBoard: string;
    isChosen: boolean;
    columns: IColumn[];
};
