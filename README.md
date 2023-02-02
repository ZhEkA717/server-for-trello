# server-for-trello

Приложение представляет из себя простейший CRUD API для работы с объектами Board, имеющими формат

```
idBoard — уникальный идентфикатор доски (string, uuid)
nameBoard — имя доски (string, required)
descriptionBoard — описание доски (number, required)
columns — список колонок доски (array of strings or empty array, required)
    - idСolumn — уникальный идентфикатор колонки (string, uuid)
    - nameColumn — имя колонки (string, required)
    - descriptionСolumn — описание колонки (number, required)
    - tasks — список задач колонки (array of strings or empty array, required)
        - idTask — уникальный идентфикатор задачи (string, uuid)
        - nameTask — имя задачи (string, required)
        - descriptionTask — описание задачи (number, required)
```

## Endpoints

- **GET** `/api/board` получить все доски;
- **GET** `/api/board/${boardID}` not completed;

- **POST** `/api/board` создать доску и добавить в database;
- **POST** `/api/column/${boardID}` создать колонку в доске с айди;
- **POST** `/api/task/${boardID}/${columnID}` создать задачу в колонке с айди в доске с айди;

- **PUT** `/api/board/{boardID}` обновляет доску по айди;
- **PUT** `/api/column/{columnID}` обновляет колонку по айди;

- **DELETE** `/api/board/${boardID}` удаляет доску по id
- **DELETE** `/api/column/${columnID}` удаляет колонку по id

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
                        "idTask": "1",
                        "nameTask": "task1",
                        "descriptionTask": "description task1"
                    },
                    {
                        "idTask": "2",
                        "nameTask": "task2",
                        "descriptionTask": "description task2"
                    }
                ]
            },
            {
                nameColumn: "in process",
                descriptionColumn: "who perform a task",
                idColumn: "35553eba-b2bb-4af4-a860-8fc71ceda6c8",
                tasks: []
            },
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
Приложение прослушивает порт, указанный в .env (5000 по умолчанию). Вы можете указать другой (изменить SERVER_PORT=5000 в файле .env). 
Проверять работу приложения удобно с помощью Postman. Его можно установить себе на компьютер или использовать расширение для Chrome.

## Тестирование
```
npm run test
```
