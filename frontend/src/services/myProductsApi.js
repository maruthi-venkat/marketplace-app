import api from './api';

const myProductsApi = {
  getAll: async () => {
    try {
      const response = await api.get('/my-products');
      console.log('Request URL:', '/my-products');
      console.log('MyProducts API Response:', response);
      console.log('Response data type:', typeof response);
      console.log('Is array?', Array.isArray(response));

      // If response is already the data array (not wrapped in data property)
      if (Array.isArray(response)) {
        return response;
      }

      // If response has data property
      if (response && response.data) {
        return Array.isArray(response.data) ? response.data : [response.data];
      }

      return [];
    } catch (error) {
      console.error('API Error Details:', {
        message: error.message,
        response: error.response,
        status: error.response?.status
      });
      throw error;
    }
  },

  getById: async (id) => {
    const response = await api.get(`/my-products/${id}`);
    return response.data;
  },

  create: async (productData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token, authorization denied');
    }

    try {
      const response = await api.post('/my-products', {
        ...productData,
        sellerId: localStorage.getItem('userId') // Add sellerId from logged-in user
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error(error.response?.data?.error || 'Failed to create product');
    }
  },

  update: async (id, productData) => {
    const response = await api.put(`/my-products/${id}`, productData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/my-products/${id}`);
    return response.data;
  }
};

export default myProductsApi; 