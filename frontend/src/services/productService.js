import { productsApi } from './api';

export const productService = {
  async getAllProducts() {
    try {
      return await productsApi.getAll();
    } catch (error) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
  },

  async getProductById(id) {
    try {
      return await productsApi.getById(id);
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to fetch product: ${error.message}`);
    }
  },

  async createProduct(productData) {
    try {
      // Validate required fields
      if (!productData.name || !productData.price) {
        throw new Error('Product name and price are required');
      }

      return await productsApi.create(productData);
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  },

  async updateProduct(id, productData) {
    try {
      return await productsApi.update(id, productData);
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to update product: ${error.message}`);
    }
  },

  async deleteProduct(id) {
    try {
      return await productsApi.delete(id);
    } catch (error) {
      if (error.status === 404) {
        throw new Error('Product not found');
      }
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  }
};

export default productService;
