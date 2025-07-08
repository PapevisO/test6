function validateItem(data) {
  const errors = [];

  if (typeof data !== 'object' || data === null) {
    errors.push('Item must be an object');
    return { valid: false, errors };
  }

  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('Name is required and must be a non-empty string');
  }

  if (typeof data.price !== 'number' || data.price <= 0) {
    errors.push('Price is required and must be a positive number');
  }

  if (data.description && typeof data.description !== 'string') {
    errors.push('Description must be a string if provided');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

module.exports = validateItem;
