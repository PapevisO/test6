const express = require('express');
const router = express.Router();
const itemsService = require('../services/itemsService');

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    let items = await itemsService.getAllItems();
    const { limit, q } = req.query;
    let results = items;

    if (q) {
      // Simple substring search (sub‑optimal)
      results = results.filter(item => item.name.toLowerCase().includes(q.toLowerCase()));
    }

    if (limit) {
      results = results.slice(0, parseInt(limit));
    }

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// GET /api/items/:id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await itemsService.getItemById(req.params.id);

    res.json(item);
  } catch (err) {
    next(err);
  }
});

// POST /api/items
router.post('/', async (req, res, next) => {
  try {
    const newItem = await itemsService.createItem(req.body);

    res.status(201).json(newItem);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
