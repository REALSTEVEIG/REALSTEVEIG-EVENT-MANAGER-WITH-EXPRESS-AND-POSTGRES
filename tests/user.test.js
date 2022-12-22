const request = require('supertest');
const app = require('../server');

describe('Post Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/register')
      .send({
        username: 'test is cool',
        email: 'Lorem ipsum',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('user');
  });
})