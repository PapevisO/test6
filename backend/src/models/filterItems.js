function filterItems(items, { q, limit }) {
  let filtered = items;

  if (q) {
    const lowerQ = q.toLowerCase();
    filtered = filtered.filter(item =>
      item.name && item.name.toLowerCase().includes(lowerQ)
    );
  }

  if (limit) {
    const parsedLimit = parseInt(limit, 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      filtered = filtered.slice(0, parsedLimit);
    }
  }

  return filtered;
}

module.exports = filterItems;
