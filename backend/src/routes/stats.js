const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const cache = require('../services/cache');
const DATA_PATH = path.join(__dirname, '../../../data/items.json');

// GET /api/stats
router.get('/', async (req, res, next) => {
  try {
      const fileStat = await fs.promises.stat(DATA_PATH);
      const cached = cache.getCachedStats(fileStat.mtimeMs);
      if (cached) {
        return res.json(cached);
      }

      const raw = await fs.promises.readFile(DATA_PATH, 'utf8');
      const items = JSON.parse(raw);
      const statsData = {
        total: items.length,
        averagePrice: items.length ? items.reduce((acc, cur) => acc + cur.price, 0) / items.length : 0
      };
      cache.setCachedStats(fileStat.mtimeMs, statsData);

      return res.json(statsData);
    } catch (err) {
      return next(err);
    }
});

router.resetCache = cache.resetCache;

module.exports = router;