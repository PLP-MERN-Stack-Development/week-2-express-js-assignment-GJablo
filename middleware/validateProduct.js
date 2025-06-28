// middleware/validateProduct.js
const validateProduct = (req, res, next) => {
  const { name, price, category } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Name is required and must be a string' });
  }

  if (typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ error: 'Price must be a positive number' });
  }

  if (!category || typeof category !== 'string') {
    return res.status(400).json({ error: 'Category is required and must be a string' });
  }

  next();
};

module.exports = validateProduct;
