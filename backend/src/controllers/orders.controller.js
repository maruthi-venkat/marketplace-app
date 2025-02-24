const Order = require('../models/Order');
const Product = require('../models/Product');
const { catchAsync } = require('../utils/errorHandler');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    console.log('Orders from database:', orders); // Add debugging
    res.json({ data: orders }); // Wrap orders in data property
  } catch (error) {
    console.error('Error in getAllOrders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.getById(id);
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const buyerId = req.user.userId; // Get the logged-in user's ID

    // Validate required fields
    if (!productId) {
      return res.status(400).json({ 
        error: 'Product ID is required' 
      });
    }

    // Fetch product to validate and get details
    const product = await Product.getById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Calculate total amount
    const totalAmount = product.price * quantity;

    const orderData = {
      productId,
      productName: product.name,
      buyerId,
      sellerId: product.sellerId,
      quantity,
      totalAmount,
      orderDate: new Date().toISOString(),
      status: 'Pending'  
    };

    // Create the order
    const newOrder = await Order.create(orderData);
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      error: 'Failed to create order',
      details: error.message 
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate status if it's being updated
    if (updateData.status && !['pending', 'processing', 'completed', 'cancelled'].includes(updateData.status)) {
      return res.status(400).json({ 
        error: 'Invalid order status' 
      });
    }

    const updatedOrder = await Order.update(id, updateData);
    
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ 
      error: `Failed to update order: ${error.message}` 
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await Order.delete(id);
    
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ 
      message: 'Order deleted successfully', 
      order: deletedOrder 
    });
  } catch (error) {
    res.status(500).json({ 
      error: `Failed to delete order: ${error.message}` 
    });
  }
};

exports.getCustomerOrders = async (req, res) => {
  try {
    const { customerId } = req.params;
    const orders = await Order.getByCustomerId(customerId);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ 
      error: `Failed to fetch customer orders: ${error.message}` 
    });
  }
};

exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.query;
    
    if (!status || !['pending', 'processing', 'completed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status parameter' });
    }

    const orders = await Order.getAll();
    const filteredOrders = orders.filter(order => order.status === status);
    
    res.json(filteredOrders);
  } catch (error) {
    res.status(500).json({ 
      error: `Failed to fetch orders: ${error.message}` 
    });
  }
};

exports.getOrdersByBuyerId = catchAsync(async (req, res) => {
  try {
    const { buyerId } = req.params;
    console.log('Controller: Fetching orders for buyerId:', buyerId);
    console.log('Authenticated user:', req.user);
    
    const orders = await Order.getByBuyerId(buyerId);
    console.log('Controller: Found orders:', orders);
    
    if (!orders || orders.length === 0) {
      console.log('No orders found for buyerId:', buyerId);
    }
    
    res.json(orders || []);
  } catch (error) {
    console.error('Error fetching buyer orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

exports.getOrdersBySellerId = catchAsync(async (req, res) => {
  try {
    const { sellerId } = req.params;
    console.log('Controller: Fetching orders for sellerId:', sellerId);
    console.log('Authenticated user:', req.user);
    
    const orders = await Order.getBySellerId(sellerId);
    console.log('Controller: Found orders:', orders);
    
    if (!orders || orders.length === 0) {
      console.log('No orders found for sellerId:', sellerId);
    }
    
    res.json(orders || []);
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});
