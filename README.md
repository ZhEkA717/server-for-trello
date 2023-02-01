# simple-crud-api

Приложение представляет из себя простейший CRUD API для работы с объектами User, имеющими формат

```
id — уникальный идентфикатор (string, uuid)
username — имя (string, required)
age — возраст (number, required)
hobbies — список хобби (array of strings or empty array, required)
```

## Endpoints

- **GET** `/api/users` получить всех юзеров;
- **GET** `/api/users/${usersID}` получить юзера по айди;
- **POST** `/api/users` создать юзера и добавить в database;
- **PUT** `/api/users/{usersID}` обновить существующего юзера;
- **DELETE** `/api/users/${usersID}` удалить существующего юзера.

## Example of valid request body:
```
{
    "username": "Elon Musk",
    "age": 55,
    "hobbies": ["programming","spending money"]
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
Приложение прослушивает порт, указанный в .env (4200 по умолчанию). Вы можете указать другой (изменить SERVER_PORT=4200 в файле .env). 
Проверять работу приложения удобно с помощью Postman. Его можно установить себе на компьютер или использовать расширение для Chrome.

## Тестирование
```
npm run test
```

Реализовано 3 сценария: 
1. Работа с 1 элементом данных
2. Проверка ошибок
3. Работа с массивом данных

## Scaling
```
npm run start:multi
```
