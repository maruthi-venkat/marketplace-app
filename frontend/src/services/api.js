import axios from 'axios';
import config from '../config/config';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response.data,
  error => {
    console.error('API Error:', error.response || error);
    const message = error.response?.data?.error || error.message;
    throw new Error(message);
  }
);

// Products API
export const productsApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: async (id) => {
    try {
      const response = await fetch(`${config.API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete product');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getAllProducts: async () => {
    try {
      const response = await fetch(`${config.API_URL}/products`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch products');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getMyProducts: async () => {
    try {
      const response = await fetch(`${config.API_URL}/my-products`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch my products');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

// My Products API
export const myProductsApi = {
  getAll: () => api.get('/my-products'),
  getById: (id) => api.get(`/my-products/${id}`),
  create: (data) => api.post('/my-products', data),
  update: (id, data) => api.put(`/my-products/${id}`, data),
  delete: (id) => api.delete(`/my-products/${id}`)
};

// Orders API
export const ordersApi = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  getByBuyerId: (buyerId) => api.get(`/orders/buyer/${buyerId}`),
  getBySellerId: (sellerId) => api.get(`/orders/seller/${sellerId}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
  delete: (id) => api.delete(`/orders/${id}`)
};

// Health check
export const checkHealth = () => api.get('/health');

export const authApi = {
  signup: async (data) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to signup');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
  
  login: async (data) => {
    try {
      const response = await fetch(`${config.API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to login');
      }
      
      return response.json();
    } catch (error) {
      throw new Error(error.message);
    }
  },
};

export default api;
