const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

let cachedStats = null;
let cachedMtime = 0;

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
      const fileStat = await fs.promises.stat(DATA_PATH);

      if (cachedStats && cachedMtime === fileStat.mtimeMs) {
        return res.json(cachedStats);
      }

      const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
      const items = JSON.parse(raw);
      const statsData = {
        total: items.length,
        averagePrice: items.length ? items.reduce((acc, cur) => acc + cur.price, 0) / items.length : 0
      };
      cachedStats = statsData;
      cachedMtime = fileStat.mtimeMs;

      return res.json(statsData);
    } catch (err) {
      return next(err);
    }
});

router.resetCache = () => {
  cachedStats = null;
  cachedMtime = 0;
};

module.exports = router;