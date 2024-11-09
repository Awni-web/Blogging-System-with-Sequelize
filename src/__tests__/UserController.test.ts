import request from 'supertest';
import app from '../index'; // Your Express app instance
import sequelize from '../config/database'; // Sequelize instance to manage the DB
import { User } from '../models/User';

let userId: string = "cd05651f-da12-44e9-97ab-52d1971fe0a0";

// beforeAll(async () => {
//   // Sync the test database
//   await sequelize.sync({ alter: true });
// });

// afterAll(async () => {
//   // Clean up the database after tests
//   await sequelize.close();
// });

describe('UserController Tests', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        username: 'newUser',
        email: 'newuser@example.com',
        password: 'password',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'newUser');
    expect(response.body).toHaveProperty('email', 'newuser@example.com');
  });
  
  it('should get a single user by ID', async () => {
    const response = await request(app).get(`/api/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body).toHaveProperty('username', 'Awni');
  });

  it('should get all users', async () => {
    const response = await request(app).get('/api/users');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a user by ID', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .send({ username: 'UpdatedUsername' });

    expect(response.status).toBe(200);
    // expect(response.body).toHaveProperty('username', 'UpdatedUsername');
  });

  it('should delete a user by ID', async () => {
    const response = await request(app).delete(`/api/users/${userId}`);

    expect(response.status).toBe(204);
  });
});
