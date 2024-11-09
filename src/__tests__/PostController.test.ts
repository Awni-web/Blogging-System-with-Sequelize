import request from 'supertest';
import  app  from '../index'; // Your Express app instance
import  sequelize  from '../config/database'; // Sequelize instance to manage the DB
import { User } from '../models/User';
import { Post } from '../models/Post';
import { Category } from '../models/Category';

// Set up test data
let userId: string = "5508e818-f800-44be-8cb9-5d2cc0f7cbe7";
let postId: string = "109641f2-0117-45f9-80ed-6a30013096a4";
let categoryId: string = "f638f900-eb18-4e41-b843-9f92cee304a1";

// beforeAll(async () => {
//   // Sync the test database
//   await sequelize.sync({ alter: true });
  
// });

// afterAll(async () => {
//   // Clean up the database after tests
//   await sequelize.close();
// });

describe('PostController Tests', () => {
  it('should create a new post', async () => {
    // const user = await User.create({ username: 'testuser', email: 'test@test.com' ,password:'m235287t'});
    const response = await request(app)
      .post('/api/posts')
      .send({
        userId,
        title: 'New Post',
        content: 'Content for the new post',
        categoryIds: [categoryId],
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('title', 'New Post');
    expect(response.body).toHaveProperty('content', 'Content for the new post');
  });

  it('should get a single post by ID', async () => {
    const response = await request(app).get(`/api/posts/${postId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', postId);
    expect(response.body).toHaveProperty('title', 'My First Post');
  });

  it('should get all posts', async () => {
    const response = await request(app).get('/api/posts');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should update a post by ID', async () => {
    const response = await request(app)
      .put(`/api/posts/${postId}`)
      .send({ title: 'Updated Post Title' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('title', 'Updated Post Title');
  });

  it('should delete a post by ID', async () => {
    const response = await request(app).delete(`/api/posts/${postId}`);

    expect(response.status).toBe(204);
  });
});
