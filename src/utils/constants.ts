import { IBoard } from "../services/board/Board.model";
export const BOARD_URL: string = '/api/board';
export const COLUMN_URL: string = '/api/column';
export const COLUMN_URL_ID: string = '/api/column/id';
export const TASK_URL: string = '/api/task';
export const TASK_URL_ID: string = '/api/task/id';

let dataBaseBoards = [
    {
        nameBoard: "trello",
        descriptionBoard: "creating app trello",
        idBoard: "9e67fcee-8b69-40cd-a335-5c506655cf9c",
        columns: [
            {
                nameColumn: "need to do",
                descriptionColumn: "what need to do week#1",
                idColumn: "082ad0bd-700f-4a80-9106-d57ccbe66424",
                tasks: [
                    {
                        nameTask: "create HTTP.CreateServer",
                        descriptionTask: "specify port 3000, create get, post-requests(URL discuss with team)",
                        idTask: "89942407-f5ca-488f-9e4a-09b3e3e6f0b0"
                    },
                    {
                        "nameTask": "updating.......",
                        "descriptionTask": "updating.......",
                        "idTask": "1ca9c510-7110-45b5-90dc-adf5adf5d72c"
                    }
                ]
            },
            {
                nameColumn: "in process",
                descriptionColumn: "who perform a task",
                idColumn: "35553eba-b2bb-4af4-a860-8fc71ceda6c8",
                tasks: [
                    {
                        nameTask: "create repository",
                        descriptionTask: "create private repo, add collaboration, set up branch of deploy",
                        idTask: "ef4d6c08-4984-454d-a30e-30f5efdb736c"
                    }
                ]
            }
        ]
    }
]
export const getAllB = ():IBoard[] => dataBaseBoards;