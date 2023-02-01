# simple-crud-api

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
- **PUT** `/api/users/{boardID}` not completed;
- **DELETE** `/api/users/${boardID}` not completed.

## Example of valid request body:
```
{
    "nameBoard": "trello",
    "descriptionBoard": "description trello",
    "idBoard": "bd679581-f3de-4b88-8718-4999b9672a84",
    "columns": []
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
