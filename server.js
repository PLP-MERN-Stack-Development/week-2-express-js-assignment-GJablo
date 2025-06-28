// server.js - Starter Express server for Week 2 assignment
// AsyncHandler
const asyncHandler = require('./utils/asyncHandler');

// middleware
const logger = require('./middleware/logger');
const authenticate = require('./middleware/auth');
const validateProduct = require('./middleware/validateProduct');

// errors
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');
const errorHandler = require('./errors/errorHandler');

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(logger);
app.use(bodyParser.json());

// Global Error Handler
app.use(errorHandler);

// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', authenticate, asyncHandler(async (req, res) => {
  const product = products.find( p => p.id == req.params.id );
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
}));

// POST /api/products - Create a new product
app.post('/api/products', authenticate, validateProduct, asyncHandler(async (req, res) => {
const newProduct = { id: products.length + 1, name: req.body.name, description: req.body.description, price: req.body.price, category: req.body.category, inStock: req.body.inStock };
products.push(newProduct);
res.status(201).json({ message: 'Product created', product: newProduct });
}));

// PUT /api/products/:id - Update a product
app.put('/api/products/:id', authenticate, validateProduct, asyncHandler(async (req, res) => {
  const product = products.find( p => p.id == req.params.id );
  if (!product) throw new NotFoundError('Product not found');

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.category = req.body.category || product.category;
  product.inStock = req.body.inStock || product.inStock;

  res.json({ message: 'Product updated', product });
}));

// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
  const product = products.filter(p => p.id == req.params.id);
  res.status(204).json({ message: 'Product deleted successfully' });
});

// Advanced Features endpoints
/*
 * GET /api/products/search?name=sofa
 * Search products by name (case-insensitive)
 */
app.get('/search', (req, res) => {
  const nameQuery = req.query.name;
  if (!nameQuery) return res.status(400).json({ message: 'Query parameter "name" is required' });

  const results = products.filter(p =>
    p.name.toLowerCase().includes(nameQuery.toLowerCase())
  );

  res.json({ total: results.length, results });
});

/*
 * GET /api/products/stats
 * Count products by category
 */
app.get('/stats', (req, res) => {
  const stats = {};

  for (const product of products) {
    const category = product.category || 'Uncategorized';
    stats[category] = (stats[category] || 0) + 1;
  }

  res.json(stats);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
