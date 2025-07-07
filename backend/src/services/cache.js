let cachedStats = null;
let cachedMtime = 0;

function getCachedStats(mtimeMs) {
  if (cachedStats && cachedMtime === mtimeMs) {
    return cachedStats;
  }
  return null;
}

function setCachedStats(mtimeMs, stats) {
  cachedMtime = mtimeMs;
  cachedStats = stats;
}

function resetCache() {
  cachedStats = null;
  cachedMtime = 0;
}

module.exports = { getCachedStats, setCachedStats, resetCache };
