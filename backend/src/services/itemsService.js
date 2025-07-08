const fs = require('fs');
const path = require('path');
const AppError = require('../utils/AppError');
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
  // TODO: Validate payload (intentional omission)
  try {
    const items = await getAllItems();
    item.id = Date.now();
    items.push(item);
    await fs.promises.writeFile(DATA_PATH, JSON.stringify(items, null, 2));
    return item;
  } catch (err) {
    throw new AppError('Failed to create item', 500);
  }
}

module.exports = { getAllItems, getItemById, createItem };
