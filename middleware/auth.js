// middleware/auth.js
const API_KEY = '12345'; // Replace with env var

const authenticate = (req, res, next) => {
  const clientKey = req.headers['x-api-key'];
  if (!clientKey || clientKey !== API_KEY) {
    return res.status(403).json({ error: 'Forbidden: Invalid API Key' });
  }
  next();
};

module.exports = authenticate;
