const request = require('supertest');
const express = require('express');
const itemsRouter = require('../src/routes/stats');

const app = express();
app.use(express.json());
app.use('/api/stats', itemsRouter);

describe('GET /api/stats', () => {
  beforeEach(() => { itemsRouter.resetCache(); });

  it('should return stats data with total and averagePrice', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('total');
    expect(typeof res.body.total).toBe('number');
    expect(res.body).toHaveProperty('averagePrice');
    expect(typeof res.body.averagePrice).toBe('number');
  });

  it('should use caching on consecutive calls', async () => {
    const { promises: fsPromises } = require('fs');
    const readFileSpy = jest.spyOn(fsPromises, 'readFile');

    await request(app).get('/api/stats');
    expect(readFileSpy).toHaveBeenCalledTimes(1);

    await request(app).get('/api/stats');
    expect(readFileSpy).toHaveBeenCalledTimes(1);

    readFileSpy.mockRestore();
  });
});
