const express = require('express');
const request = require('supertest');
const { router } = require('../../routes/routes');

const testServer = express();

const BASE_URL = 'http://localhost:3335';

const testUser = {
    firstName: 'David',
    lastName: 'Ribeiro',
    email: 'admin@example.com',
    password: 'admin'
}

async function userAlreadyExists() {
    const userResponse = await request(BASE_URL)
        .get(`/api/find/${testUser.email}`)

    if (userResponse.status !== 200) return false;

    return true;
}

describe('API endpoints test', () => {
    beforeAll(async () => {
        try {
            const response = await fetch(BASE_URL);

            if (response.status !== 200) {
                throw new Error();
            }

        } catch (error) {
            testServer.use(express.json());
            testServer.use(router);
            testServer.listen(3335, () => console.log('Test server running on port 3335'));
        }
    });

    it('/create - should create a new user', async () => {
        const verifyUserAlreadyExists = await userAlreadyExists();

        const response = await request(BASE_URL)
            .post('/api/create')
            .set('Content-Type', 'application/json')
            .set('password', testUser.password)
            .send({
                "user": {
                    firstName: testUser.firstName,
                    lastName: testUser.lastName,
                    email: testUser.email
                }
            });

        if (verifyUserAlreadyExists) {
            expect(response.status).toEqual(400);
            return;
        }

        expect(response.status).toEqual(201);
    });

    it('/find/:email - should find user by email', async () => {
        const response = await request(BASE_URL)
            .get(`/api/find/${testUser.email}`);

        expect(response.status).toEqual(200);

    });

    it('/login/:email - should login user', async () => {

        const response = await request(BASE_URL)
            .post(`/api/login/${testUser.email}`)
            .set('password', 'admin');

        expect(response.status).toEqual(200);
    });

    it('/update/:email - should update first name and last name', async () => {
        const verifyUserAlreadyExists = await userAlreadyExists();

        const response = await request(BASE_URL)
            .put(`/api/update/${testUser.email}`)
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'Primeiro nome atualizado',
                lastName: 'Sobrenome atualizado 2'
            })

        if (verifyUserAlreadyExists) {
            expect(response.status).toEqual(202);
            return;
        }

        expect(response.status).toEqual(404);
    });

    it('/update/:email - should update password', async () => {
        const verifyUserAlreadyExists = await userAlreadyExists();

        const response = await request(BASE_URL)
            .put(`/api/update/${testUser.email}`)
            .set('Content-Type', 'application/json')
            .send({
                password: 'novo_password'
            });

        if (verifyUserAlreadyExists) {
            expect(response.status).toEqual(202);
            return;
        }

        expect(response.status).toEqual(404);
    });

    it('/delete/:email - should delete user', async () => {
        const verifyUserAlreadyExists = await userAlreadyExists();

        const response = await request(BASE_URL)
            .delete(`/api/delete/${testUser.email}`);

        if (verifyUserAlreadyExists) {
            expect(response.status).toEqual(202);
            return;
        }

        expect(response.status).toEqual(404);
    });
});
