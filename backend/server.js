const express = require('express');
const cors = require('cors');
const { validateConnection } = require('./src/config/airtable');
const productRoutes = require('./src/routes/products.route');
const myProductsRoutes = require('./src/routes/myProducts.route');
const authRoutes = require('./src/routes/auth.route');
require('dotenv').config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/my-products', myProductsRoutes);
app.use('/api/orders', require('./src/routes/orders.route'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the E-commerce API',
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      health: '/health'
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

// Connect to Airtable and start server
validateConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
});

module.exports = app; // For testing purposes
