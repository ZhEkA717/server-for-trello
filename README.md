# server-for-trello

Приложение представляет из себя простейший CRUD API для работы с объектами Board, имеющими формат

### Board
```
idBoard — уникальный идентфикатор доски (string, uuid)
nameBoard — имя доски (string, required)
descriptionBoard — описание доски (number, required)
columns — список колонок доски (array of strings or empty array, required)
```
### Column
```
- idСolumn — уникальный идентфикатор колонки (string, uuid)
- nameColumn — имя колонки (string, required)
- descriptionСolumn — описание колонки (number, required)
- tasks — список задач колонки (array of strings or empty array, required)
```
### Task
```
- idTask — уникальный идентфикатор задачи (string, uuid)
- nameTask — имя задачи (string, required)
- descriptionTask — описание задачи (number, required)
```


## Endpoints
### Board
- **GET** `/api/board` получить все доски;
- **GET** `/api/board/${boardID}` получить доску по id;
- **POST** `/api/board` создать доску и добавить в database;
- **PUT** `/api/board/{boardID}` обновить доску по айди;
- **DELETE** `/api/board/${boardID}` удаляет доску по id;
### Column
- **GET** `/api/column/${boardID}` получить все колонки в доске по айди доски;
- **GET** `/api/column/id/${columnID}` получить колонку по айди;
- **POST** `/api/column/${boardID}` создать колонку в доске с айди;
- **PUT** `/api/column/{columnID}` обновить колонку по айди;
- **DELETE** `/api/column/${columnID}` удаляет колонку по idж
### Task
- **GET** `/api/task/${boardID}/${columnID}` получить все задачи в доске в колонке по айди доски и колонки;
- **GET** `/api/task/id/${taskID}` получить задачу по id;
- **POST** `/api/task/${boardID}/${columnID}` создать задачу в колонке с айди в доске с айди;
- **POST** `/api/task/${columnID}` создать задачу в колонке с айди;
- **PUT** `/api/task/${taskID}` обновить задачу по айди;
- **PUT** `/api/task/move/${taskID}` переместить задачу в новую колонку;
- **DELETE** `/api/task/${taskID}` удаляет задачу по id;

### Column MOVE
---
- URL

    /column/move/:id

- Method

    `PUT`
    
- Data parameters:
```typescript
    {
        toBoardId: string,
        newPosition: number
    }
```
### Task MOVE
---
- URL

    /task/move/:id

- Method

    `PUT`

- Data parameters:
```typescript
    {
        toColumnId: string,
        newPosition: number,
    }
```
---
## Example of valid request body:
```
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
```
## Установка приложения

```
git clone {repository URL}
```

```
npm install или npm i
```

## Запуск приложения

Запуск приложения в режиме разработки

```
npm run start:dev
```
## Запуск в режиме релиза

```
npm run start:prod
```
Приложение прослушивает порт, указанный в .env (3000 по умолчанию). Вы можете указать другой (изменить SERVER_PORT=3000 в файле .env). 
Проверять работу приложения удобно с помощью Postman. Его можно установить себе на компьютер или использовать расширение для Chrome.

## Тестирование
```
npm run test
```
