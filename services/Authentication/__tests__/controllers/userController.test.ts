// tests/controllers/userController.test.ts
import request from 'supertest';
import app from '../../../Authentication/src/app/api/app'; // Import your app instance
import { mockQuery } from '../config/db.mock'; // Import the mocked query method

jest.mock('../../../Authentication/src/app/api/config/db', () => require('../config/db.mock')); // Use the mock

describe('POST /api/register', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Reset mocks between tests
  });

  it('should register a new user with valid input', async () => {
    const validUser = {
      username: 'testuser',
      password: 'Test@1234',
      user_role: 'user',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    };

    mockQuery.mockResolvedValueOnce({}); // Mock successful DB insert

    const response = await request(app).post('/api/register').send(validUser);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User registration successful');
    expect(mockQuery).toHaveBeenCalledWith(
      expect.any(String),
      expect.arrayContaining([
        validUser.username,
        expect.any(String), // Hashed password
        validUser.user_role,
        validUser.first_name,
        validUser.last_name,
        validUser.email,
      ])
    );
  });

  it('should return 400 for invalid input', async () => {
    const invalidUser = {
      username: 'te', // Too short
      password: '123', // Weak password
      email: 'invalidemail.com', // Invalid email
    };

    const response = await request(app).post('/api/register').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined(); // Expect validation errors
    expect(mockQuery).not.toHaveBeenCalled(); // DB shouldn't be called
  });

  it('should return 500 for unexpected errors', async () => {
    const validUser = {
      username: 'testuser',
      password: 'Test@1234',
      user_role: 'user',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
    };

    mockQuery.mockRejectedValueOnce(new Error('Database error')); // Simulate DB error

    const response = await request(app).post('/api/register').send(validUser);

    expect(response.status).toBe(500);
    expect(mockQuery).toHaveBeenCalled();
  });
});
