const Product = require('../models/Product');
const { catchAsync } = require('../utils/errorHandler');

exports.getAllMyProducts = catchAsync(async (req, res) => {
  try {
    const sellerId = req.user.userId;
    const products = await Product.getProductsBySellerId(sellerId);
    
    if (!products) {
      return res.json([]);
    }
    res.json(products);
  } catch (error) {
    console.error('Controller error:', error);
    res.status(500).json({ error: error.message });
  }
});

exports.createMyProduct = catchAsync(async (req, res) => {
  try {
    const productData = {
      ...req.body,
      sellerId: req.user.userId
    };

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: error.message });
  }
});

exports.getMyProductById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.userId;
    
    const product = await Product.getById(id);
    
    if (!product || product.sellerId !== sellerId) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.updateMyProduct = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.userId;
    
    // First check if the product belongs to the user
    const existingProduct = await Product.getById(id);
    if (!existingProduct || existingProduct.sellerId !== sellerId) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const updatedProduct = await Product.update(id, req.body);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.deleteMyProduct = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.userId;
    
    // First check if the product belongs to the user
    const existingProduct = await Product.getById(id);
    if (!existingProduct || existingProduct.sellerId !== sellerId) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    await Product.delete(id);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});