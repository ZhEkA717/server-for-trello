"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDB = exports.getAllB = exports.LOGIN_URL = exports.REGISTER_URL = exports.TASK_URL_MOVE = exports.TASK_URL_ID = exports.TASK_URL = exports.COLUMN_URL_MOVE = exports.COLUMN_URL_ID = exports.COLUMN_URL = exports.BOARD_URL = void 0;
exports.BOARD_URL = '/api/board';
exports.COLUMN_URL = '/api/column';
exports.COLUMN_URL_ID = '/api/column/id';
exports.COLUMN_URL_MOVE = '/api/column/move';
exports.TASK_URL = '/api/task';
exports.TASK_URL_ID = '/api/task/id';
exports.TASK_URL_MOVE = '/api/task/move';
exports.REGISTER_URL = '/api/register';
exports.LOGIN_URL = '/api/login';
let dataBaseBoards = [
    {
        nameBoard: "Trello",
        dateBoard: new Date('06.02.2023'),
        descriptionBoard: "creating app trello",
        isChosen: true,
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
    },
];
const getAllB = () => dataBaseBoards;
exports.getAllB = getAllB;
const dataBaseUsers = [
    {
        "id": "8e0bcefd-6af9-4383-a490-3a3f5897fcfd",
        "firstName": "Elon",
        "lastName": "Petrov",
        "email": "Petrovich@tesla.com",
        "password": "$2a$10$NTM4qFhQXNAuINEUgAciHend3tqXIBW6RIr1fgEoZRTXAgfS4O9ka",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZTBiY2VmZC02YWY5LTQzODMtYTQ5MC0zYTNmNTg5N2ZjZmQiLCJlbWFpbCI6IlBldHJvdmljaEB0ZXNsYS5jb20iLCJpYXQiOjE2NzU5NDMzNTMsImV4cCI6MTY3NjAyOTc1M30.wd_gb2oRqgQuYBlMda75hHAdtREflhbxqR5o0p-dbl4"
    },
];
const getUserDB = () => dataBaseUsers;
exports.getUserDB = getUserDB;
