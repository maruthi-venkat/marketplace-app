const Product = require('../models/Product');
const { catchAsync } = require('../utils/errorHandler');

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.getAll();
  res.json(products);
});

exports.getProductById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const product = await Product.getById(id);
  
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  
  res.json(product);
});

exports.createProduct = async (req, res) => {
  try {
    const productData = req.body;
    
    // Basic validation
    if (!productData.name || !productData.price) {
      return res.status(400).json({ error: 'Name and price are required' });
    }

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await Product.update(id, productData);
    
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.delete(id);
    
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully', product: deletedProduct });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
