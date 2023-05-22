const request = require('supertest');
const { app } = require('../../app');
const { verifyUserAlreadyExists } = require('../../utils/verifyUserAlreadyExists');


const BASE_URL = 'http://localhost:3336';

const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'example@example.com',
    password: 'example'
}

describe('Testes dos endpoints da api', () => {
    let testServer;
    let userAlreadyExists;
    let testUserId;

    beforeAll(() => {
        testServer = app.listen(3336, () => console.log('Test server running on port 3336'));
    });

    beforeEach(async () => {
        const { result, user } = await verifyUserAlreadyExists(testUser.email);
        userAlreadyExists = result;
        testUserId = user !== null && user.id;
    });

    afterAll(async () => {
        await testServer.close();
    });

    it('/create - deve ser possível criar um novo usuário', async () => {
        const response = await request(BASE_URL)
            .post('/api/create')
            .set('Content-Type', 'application/json')
            .send({
                "user": {
                    firstName: testUser.firstName,
                    lastName: testUser.lastName,
                    email: testUser.email,
                    password: testUser.password
                }
            });

        if (userAlreadyExists) {
            expect(response.status).toEqual(400);
            return;
        }

        expect(response.status).toEqual(201);
    });

    it('/find/:email - deve ser possível localizar um usuário pelo email', async () => {

        const response = await request(BASE_URL)
            .get(`/api/find/${testUser.email}`);

        if (!userAlreadyExists) {
            expect(response.status).toEqual(400);
            return;
        }

        expect(response.status).toEqual(200);
    });

    it('/login/:email - deve ser possível fazer o login pelo email', async () => {
        const response = await request(BASE_URL)
            .post(`/api/login/${testUser.email}`)
            .send({
                password: testUser.password
            })

        if (!userAlreadyExists) {
            expect(response.status).toEqual(404);
            return;
        }

        expect(response.status).toEqual(200);

    });

    it('/update/:id - deve ser possível atualizar o nome e sobrenome do usuário', async () => {

        const response = await request(BASE_URL)
            .put(`/api/update/${testUserId}`)
            .set('Content-Type', 'application/json')
            .send({
                firstName: 'Primeiro nome atualizado',
                lastName: 'Sobrenome atualizado 2'
            })

        if (!userAlreadyExists) {
            expect(response.status).toEqual(404);
            return;
        }

        expect(response.status).toEqual(202);
    });

    it('/update/:id - deve ser possível atualizar a senha do usuário', async () => {

        const response = await request(BASE_URL)
            .put(`/api/update/${testUserId}`)
            .set('Content-Type', 'application/json')
            .send({
                password: 'novo_password'
            });

        if (!userAlreadyExists) {
            expect(response.status).toEqual(404);
            return;
        }

        expect(response.status).toEqual(202);
    });

    it('/delete/:id - deve ser possível deletar o usuário', async () => {

        const response = await request(BASE_URL)
            .delete(`/api/delete/${testUserId}`);

        if (!userAlreadyExists) {
            expect(response.status).toEqual(404);
            return;
        }

        expect(response.status).toEqual(202);
    });
});
