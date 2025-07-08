const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
const validateItem = require('../models/validateItem');
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

async function getAllItems() {
  try {
    const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    throw new AppError('Failed to read items', 500);
  }
}

async function getItemById(id) {
  const items = await getAllItems();
  const item = items.find(i => i.id === parseInt(id));
  if (!item) {
    throw new AppError('Item not found', 404);
  }
  return item;
}

async function createItem(item) {
  item.id ||= Date.now();
  const { valid, errors } = validateItem(item);

  if (!valid) {
    throw new AppError(`Invalid item: ${errors.join(', ')}`, 422);
  }

  try {
    const items = await getAllItems();
    items.push(item);
    await fs.promises.writeFile(DATA_PATH, JSON.stringify(items, null, 2));
    return item;
  } catch (err) {
    throw new AppError('Internal server error', 500);
  }
}

module.exports = { getAllItems, getItemById, createItem };
