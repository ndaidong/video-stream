// server.test

const request = require('supertest');

const server = require('./server');


describe('Test endpoints', () => {
  it('GET /', async (done) => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch('application/json');
    done();
  });

  it('GET /videos', async (done) => {
    const res = await request(server).get('/videos');
    expect(res.statusCode).toEqual(200);
    expect(res.headers['content-type']).toMatch('application/json');
    done();
  });
});
