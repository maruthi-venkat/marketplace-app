import api from './api';

const ordersApi = {
  async create(orderData) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }
    try {
      const response = await api.post('/orders', orderData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error('Failed to create order: ' + error.message);
    }
  },

  async getByBuyerId(buyerId) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }
    try {
      // API response is already the array - no need for .data
      const orders = await api.get(`/orders/buyer/${buyerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Processed buyer orders:', orders);
      return Array.isArray(orders) ? orders : [];
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error('Failed to fetch placed orders: ' + error.message);
    }
  },

  async getBySellerId(sellerId) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please log in.');
    }
    try {
      // API response is already the array - no need for .data
      const orders = await api.get(`/orders/seller/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Processed seller orders:', orders);
      return Array.isArray(orders) ? orders : [];
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        throw new Error('Authentication expired. Please log in again.');
      }
      throw new Error('Failed to fetch received orders: ' + error.message);
    }
  }
};

export default ordersApi; 