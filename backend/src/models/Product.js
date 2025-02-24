const db = require('../utils/db');
const { productsBase } = require('../config/airtable');
const { handleAirtableError } = require('../utils/errorHandler');

class Product {
  static async getAll(options = {}) {
    try {
      const records = await productsBase('Products')
        .select({
          maxRecords: options.limit || 100,
          view: 'Grid view',
          fields: ['name', 'description', 'price', 'image', 'sellerId']
        })
        .all();
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw handleAirtableError(error);
    }
  }

  static async getById(id) {
    try {
      const record = await productsBase('Products').find(id);
      return { id: record.id, ...record.fields };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw handleAirtableError(error);
    }
  }

  static async create(data) {
    try {
      const records = await productsBase('Products').create([{
        fields: {
          name: data.name,
          description: data.description,
          price: data.price,
          image: data.image,
          sellerId: data.sellerId
        }
      }]);
      
      return { id: records[0].id, ...records[0].fields };
    } catch (error) {
      throw handleAirtableError(error);
    }
  }

  static async update(id, data) {
    try {
      const { createdAt, ...updateData } = data;
      
      const records = await productsBase('Products').update([
        { id, fields: updateData }
      ]);
      return { id: records[0].id, ...records[0].fields };
    } catch (error) {
      console.error('Error updating product:', error);
      throw handleAirtableError(error);
    }
  }

  static async delete(id) {
    try {
      const records = await productsBase('Products').destroy([id]);
      return { id: records[0].id, ...records[0].fields };
    } catch (error) {
      console.error('Error deleting product:', error);
      throw handleAirtableError(error);
    }
  }

  static async findByName(name) {
    try {
      const records = await productsBase('Products')
        .select({
          filterByFormula: `{name} = '${name}'`,
          maxRecords: 1
        })
        .firstPage();
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }));
    } catch (error) {
      console.error('Error finding product by name:', error);
      throw handleAirtableError(error);
    }
  }

  static async getProductsBySellerId(sellerId) {
    try {
      const records = await productsBase('Products')
        .select({
          filterByFormula: `{sellerId} = '${sellerId}'`
        })
        .all();
      
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }));
    } catch (error) {
      throw handleAirtableError(error);
    }
  }
}

module.exports = Product;
