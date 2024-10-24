import request from 'supertest';
import { server } from '../index';

afterAll((done) => {
  server.close(done);
});

describe('crud api', () => {
  test('should return an empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('should create a new object and return it', async () => {
    const testUser = {
      username: 'user1',
      age: 26,
      hobbies: ['reading', 'gaming'],
    };

    const response = await request(server)
      .post('/api/users')
      .send(testUser)

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(testUser));
    expect(response.body.id).toBeDefined();
  });

    test('should get the created record by its id', async () => {
      const testUser = {
        username: 'user1',
        age: 26,
        hobbies: ['reading', 'gaming'],
      };

      const responseCreated = await request(server).post('/api/users').send(testUser);
      const userId = responseCreated.body.id;
      const responseUser = await request(server).get(`/api/users/${userId}`);

      expect(responseUser.status).toBe(200);
      expect(responseUser.body).toEqual(expect.objectContaining(testUser));
    });
});
