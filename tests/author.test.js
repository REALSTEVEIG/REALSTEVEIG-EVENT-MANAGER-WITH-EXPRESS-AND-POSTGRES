const request = require('supertest');
const app = require('../server');

describe('Post Endpoint', () => {
  it('Should login the admin', async () => {
    const res = await request(app)
      .post('/admin/login')
      .send({
        email: "admin@gmail.com",
        password: 'admin'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
  });

  it('Should fetch a single user', async () => {
    const userId = 1;
    const res = await request(app).get(`/admin/users/${userId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('post');
  });

  it('Should fetch all users', async () => {
    const res = await request(app).get('/admin/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('users');
    expect(res.body.posts).toHaveLength(1);
  });

  it('Should update the status of a user', async () => {
    const res = await request(app)
      .put('/admin/users/1')
      .send({
        userId: 1,
        status : 'Approved'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.post).toHaveProperty('status', 'updated status');
  });

  it('Should return status code 500 if db constraint is violated', async () => {
    const res = await request(app)
      .post('/admin')
      .send({
        error : 'There was an error'
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });

  it('Should respond with status code 404 if resource is not found', async () => {
    const userId = 1;
    const res = await request(app).get(`/admin/${userId}`);
    expect(res.statusCode).toEqual(404);
  });
});
