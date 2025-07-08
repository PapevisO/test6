const express = require('express');
const router = express.Router();
const itemsService = require('../services/itemsService');
const filterItems = require('../models/filterItems');

// GET /api/items
router.get('/', async (req, res, next) => {
  try {
    const allItems = await itemsService.getAllItems();
    const results = filterItems(allItems, req.query);

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
