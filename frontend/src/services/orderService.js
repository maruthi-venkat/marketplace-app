import { ordersApi } from './api';

export const orderService = {
  async getAllOrders() {
    try {
      return await ordersApi.getAll();
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  },

  async getOrderById(id) {
    try {
      return await ordersApi.getById(id);
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  },

  async createOrder(orderData) {
    try {
      // Validate required fields
      if (!orderData.productId || !orderData.customerId) {
        throw new Error('Product ID and Customer ID are required');
      }

      if (!orderData.quantity || orderData.quantity < 1) {
        throw new Error('Valid quantity is required');
      }

      return await ordersApi.create(orderData);
    } catch (error) {
      throw new Error(`Failed to create order: ${error.message}`);
    }
  },

  async updateOrderStatus(id, status) {
    try {
      // Validate status
      const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
      if (!validStatuses.includes(status)) {
        throw new Error('Invalid order status');
      }

      return await ordersApi.update(id, { status });
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error(`Failed to update order status: ${error.message}`);
    }
  },

  async getCustomerOrders(customerId) {
    try {
      return await ordersApi.getByCustomerId(customerId);
    } catch (error) {
      throw new Error(`Failed to fetch customer orders: ${error.message}`);
    }
  },

  async getOrdersByStatus(status) {
    try {
      // Convert status to match backend format
      const validStatuses = ['Pending', 'Processing', 'Completed', 'Cancelled'];
      const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
      
      if (!validStatuses.includes(formattedStatus)) {
        throw new Error('Invalid status parameter');
      }

      const orders = await ordersApi.getAll();
      return orders.filter(order => order.status.toLowerCase() === status.toLowerCase());
    } catch (error) {
      throw new Error(`Failed to fetch orders by status: ${error.message}`);
    }
  },

  async cancelOrder(id) {
    try {
      return await ordersApi.update(id, { status: 'cancelled' });
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error(`Failed to cancel order: ${error.message}`);
    }
  },

  async acceptOrder(id) {
    try {
      return await ordersApi.update(id, { status: 'processing' });
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Order not found');
      }
      throw new Error(`Failed to accept order: ${error.message}`);
    }
  }
};

export default orderService;
