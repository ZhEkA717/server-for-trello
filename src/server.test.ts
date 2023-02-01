import request from 'supertest';
import { IUser } from './services/User.model';
import { createServer } from './Server/createServer';
import { BASE_URL } from './utils/constants';

const server = createServer('5000');

let USER: IUser = {
    username: "Alesha Popovich",
    age: 666,
    hobbies: ["fishing", "running"]
};

const USERS_DATA: IUser[] = [
    {
        username: "Mity Fomin",
        age: 19,
        hobbies: ["signing", "dancing"]
    },
    {
        username: "Dima Bilan",
        age: 23,
        hobbies: ["signing", "jumping"]
    },
    {
        username: "Morgenshtern",
        age: 10,
        hobbies: [""]
    }
];

describe('Simple CRUD API TEST', () => {
    describe('First scenario', () => {
        let id: number = 0;
        afterAll(() => server.close());
        it('Should return all users', async () => {
            const requestServer = await request(server)
                .get(BASE_URL)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body).toEqual([]);
            expect(Array.isArray(requestServer.body)).toBe(true);
        });
        it('Should create user successfully', async () => {
            const requestServer = await request(server)
                .post(BASE_URL)
                .send(USER)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            expect(requestServer.statusCode).toEqual(201);
            expect(requestServer.body.username).toEqual(USER.username);
            expect(requestServer.body.age).toEqual(USER.age);
            expect(JSON.stringify(requestServer.body.hobbies))
                .toEqual(
                    JSON.stringify(USER.hobbies),
                );
            id = requestServer.body.id;
        });
        it('Should get a person by id', async () => {
            const requestServer = await request(server)
                .get(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body).toEqual({ ...USER, id });
            expect(requestServer.body instanceof Object).toBe(true);
        });
        it('Should update a person by id', async () => {
            USER = { ...USER, username: "Mity Fomin" };
            const requestServer = await request(server)
                .put(`${BASE_URL}/${id}`)
                .send(USER)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
            expect(requestServer.statusCode).toEqual(200);
            expect(requestServer.body.username).toEqual(USER.username);
            expect(requestServer.body.age).toEqual(USER.age);
            expect(JSON.stringify(requestServer.body.hobbies))
                .toEqual(
                    JSON.stringify(USER.hobbies),
                );
        });
        it('Should delete a person by id', async () => {
            const requestServer = await request(server)
                .delete(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(204);
        });
        it('Should return error 404, because user is deleted', async () => {
            const requestServer = await request(server)
                .get(`${BASE_URL}/${id}`)
            expect(requestServer.statusCode).toEqual(404);
        });
    });
    describe('Second scenario', () => {
        it('Should get a person by invalid ID', async () => {
            const requestServer = await request(server)
                .get(`${BASE_URL}/${123}`)
            expect(requestServer.statusCode).toEqual(400);
            expect(requestServer.body instanceof Object).toBe(true);
        });
        it('create user with invalid data', async () => {
            const requestServer = await request(server)
                .post(BASE_URL)
                .send({ ...USER, username: 123 })
            expect(requestServer.statusCode).toEqual(400);
        });
        it('delete non-existing user', async () => {
            const requestServer = await request(server)
                .delete(`${BASE_URL}/5d4f620b-d688-41f6-b1cd-2ca4c85dbd94`)
            expect(requestServer.statusCode).toEqual(404);
        });
        it('delete user with wrong id (not uuid)', async () => {
            const requestServer = await request(server)
                .delete(`${BASE_URL}/12314`)
            expect(requestServer.statusCode).toEqual(400);
        });
        it('update non-existing user', async () => {
            const requestServer = await request(server)
                .put(`${BASE_URL}/5d4f620b-d688-41f6-b1cd-2ca4c85dbd94`)
                .send({ ...USER, username: 'Sanya' })
            expect(requestServer.statusCode).toEqual(404);
        });
        it('update user with wrong id (not uuid)', async () => {
            const requestServer = await request(server)
                .put(`${BASE_URL}/123`)
                .send({ ...USER, username: 'Sanya' })
            expect(requestServer.statusCode).toEqual(400);
        });
    })
    describe('Third scenario', () => {
        let usersArr: IUser[] = [];
        it('Should create 3 users successfully', async () => {
            await USERS_DATA.forEach(async (user) => {
                const requestServer = await request(server)
                    .post(BASE_URL)
                    .send(user)
                expect(requestServer.statusCode).toEqual(201);
                expect(requestServer.body.username).toEqual(user.username);
                expect(requestServer.body.age).toEqual(user.age);
                expect(JSON.stringify(requestServer.body.hobbies))
                    .toEqual(
                        JSON.stringify(user.hobbies),
                    );
            })
        });
        it('Should return all users', async () => {
            const requestServer = await request(server)
                .get(BASE_URL)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/);
            usersArr = requestServer.body;
            expect(requestServer.statusCode).toEqual(200);
            expect(Array.isArray(requestServer.body)).toBe(true);
        });
        it('Should delete 3 users successfully', async () => {
            await usersArr.forEach(async (user) => {
                const requestServer = await request(server)
                    .delete(`${BASE_URL}/${user.id}`)
                expect(requestServer.statusCode).toEqual(204);
            })
        });
        it('Should get deleted USERS (404 error)', async () => {
            await usersArr.forEach(async (user) => {
                const requestServer = await request(server)
                    .get(`${BASE_URL}/${user.id}`)
                expect(requestServer.statusCode).toEqual(404 || 200);
            })
        });
    });
})
