const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../src/models');
const { config } = require('dotenv');
const db = require('../src/models');
const userService = require('../src/services/api/user.service.js');
config();
describe('Bank Details API', () => {

  let server;
  beforeAll(async () => {
    // Set up the server before running the tests
    server = await app.listen(process.env.TEST_PORT);
    console.log(`Server is running on port ${process.env.TEST_PORT}`);
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });

  afterAll(async () => {
    // Close the server after running the tests
    await server.close();
  });
  describe('POST /register', () => {
    it('should return 200 and create a user record', async () => {
      const requestBody = {
        first_name: 'xy',
        last_name: 'z',
        email: 'h@g.com',
        password: '123456',
        phone: '1234567890',
      };
      const mockRecord = { ...requestBody, id:100, createdAt: '2023-05-21T12:34:56Z', updatedAt: '2023-05-21T12:34:56Z' };
      userService.create = jest.fn().mockResolvedValue(mockRecord);
      // Make the request to the API endpoint
      const response = await request(app).post('/api/register').send(requestBody).expect(200);
      expect(response.body).toEqual(expect.objectContaining({
        code: 200,
        data: {
            id:100,
            first_name: 'xy',
            last_name: 'z',
            email: 'h@g.com',
            phone: '1234567890',
            createdAt: '2023-05-21T12:34:56Z', 
            updatedAt: '2023-05-21T12:34:56Z'
        },
        success: true,
        pagination: null
      }));
    });

    it('should return 400 if validation fails', async () => {
      // Mock the request body with invalid data
      const requestBody = {
        bank_name: '',
        account_holder_name: '',
        account_number: '',
      };

      // Make the request to the API endpoint
      const response = await request(app)
        .post('/api/bank_details')
        .send(requestBody)
        .expect(400);

      // Assert the response
      expect(response.body).toEqual(expect.objectContaining({
        code: 400,
      }));
    });
  });
});