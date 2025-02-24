const express = require('express');
const cors = require('cors');
const authMiddleware = require('./middleware/auth');
const ordersRouter = require('./routes/orders.route');

const app = express();

app.use(cors());
app.use(express.json());

// Orders routes with auth middleware
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

module.exports = app; 