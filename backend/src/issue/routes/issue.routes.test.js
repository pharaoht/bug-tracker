const request = require('supertest');
const app = require('../../app');
const isLoginMiddleware = require('../../middleware/login.middleware');

jest.mock('../../middleware/login.middleware', () => jest.fn());

describe('Issues API', () => {

    describe('GET Methods', () => {

        describe('GET /api/issues', () => {

            test('It should return status code 200', async () => {

                const response = await request(app)
                    .get('/api/issues')
                    .expect(200)

            });
        });

        describe('GET /api/issues/:id', () => {

            test('It should return status code 200', async () => {

                const response = await request(app)
                    .get('/api/issues/1')
                    .expect(200)

            })

        });
    });


    describe('POST Methods', () => {

        describe('POST /api/issues/new', () => {

            const validData = {
                title: 'Test Title',
                description: 'Test Description',
                userId: '1',
            };

            const invalidData = {
                title: '',
                description:'',
                userId:''
            };

            test('It should return status code 401 Unauthorized when user is not authenticated', async () => {

                const response = await request(app)
                    .post('/api/issues/new')
                    .send(invalidData)
                    .expect(401)
            });

            test('It should return status code 400 Bad Request when user gives invalid data to create new issue', async () => {

                

            })
        });
    });

    describe('PUT Methods', () => {

        describe('PUT /api/issues/:id', () => {

            test('It should return 200', async () => {


            })
        })
    })





});