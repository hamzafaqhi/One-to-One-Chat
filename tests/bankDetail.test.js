const request = require('supertest');
const app = require('../server');
const { sequelize } = require('../src/models');
const { config } = require('dotenv');
const bankDetailService = require('../src/services/BankDetail.service.js');
const db = require('../src/models');
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
  describe('POST /bank_details', () => {
    it('should return 200 and create a bank detail record', async () => {
      const requestBody = {
        bank_name: 'Example Bank',
        account_holder_name: 'John Doe',
        account_number: '1234567890',
      };
      const mockRecord = { ...requestBody, id:100, createdAt: '2023-05-21T12:34:56Z', updatedAt: '2023-05-21T12:34:56Z' };
      bankDetailService.create = jest.fn().mockResolvedValue(mockRecord);
      // Make the request to the API endpoint
      const response = await request(app)
        .post('/api/bank_details')
        .send(requestBody)
        .expect(200);
      expect(response.body).toEqual(expect.objectContaining({
        code: 200,
        data: {
          id:100,
          bank_name: 'Example Bank',
          account_number: '1234567890',
          account_holder_name: 'John Doe',
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