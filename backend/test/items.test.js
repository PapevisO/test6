const request = require('supertest');
const express = require('express');
const itemsRouter = require('../src/routes/items');

const app = express();
app.use(express.json());
app.use('/api/items', itemsRouter);


describe('GET /api/items', () => {
  it('should return an array of items', async () => {
    const res = await request(app).get('/api/items');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return filtered items when using query "q"', async () => {
    // This test assumes that at least one item contains the string 'test' in its name (case-insensitive)
    const res = await request(app).get('/api/items?q=test');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    res.body.forEach(item => {
      expect(item.name.toLowerCase()).toContain('test');
    });
  });
});

describe('POST /api/items', () => {
  it('should create a new item', async () => {
    const newItem = { name: 'New Test Item', price: 20 };
    const res = await request(app).post('/api/items').send(newItem);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(newItem.name);
    expect(res.body.price).toBe(newItem.price);
    expect(res.body).toHaveProperty('id');
  });
});

