const { ordersBase } = require('../config/airtable');

class Order {
  static async getAll() {
    try {
      const records = await ordersBase('Orders').select().all();
      console.log('Raw records from Airtable:', records); // Add debugging
      
      const orders = records.map(record => ({
        id: record.id,
        productId: record.fields.productId,
        customerId: record.fields.customerId,
        quantity: record.fields.quantity,
        productName: record.fields.productName,
        totalAmount: record.fields.totalAmount,
        orderDate: record.fields.orderDate,
        status: record.fields.status || 'pending'
      }));
      
      console.log('Formatted orders:', orders); // Add debugging
      return orders;
    } catch (error) {
      console.error('Error in getAll:', error);
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  static async getById(id) {
    try {
      const record = await ordersBase('Orders').find(id);
      return { id: record.id, ...record.fields };
    } catch (error) {
      if (error.error === 'NOT_FOUND') {
        return null;
      }
      throw error;
    }
  }

  static async create(orderData) {
    try {
      const formattedData = {
        productId: orderData.productId,
        buyerId: orderData.buyerId,
        sellerId: orderData.sellerId,
        quantity: orderData.quantity,
        productName: orderData.productName,
        totalAmount: orderData.totalAmount,
        orderDate: new Date().toISOString().split('T')[0],
        status: 'Pending'  
      };

      const record = await ordersBase('Orders').create([
        { fields: formattedData }
      ]);
      return { id: record[0].id, ...record[0].fields };
    } catch (error) {
      console.error('Order creation error:', error);
      throw new Error(`Failed to create order: ${error.message}`);
    }
  }

  static async update(id, orderData) {
    try {
      const record = await ordersBase('Orders').update([
        {
          id: id,
          fields: orderData
        }
      ]);
      return { id: record[0].id, ...record[0].fields };
    } catch (error) {
      if (error.error === 'NOT_FOUND') {
        return null;
      }
      throw new Error(`Failed to update order: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const record = await ordersBase('Orders').destroy([id]);
      return { id: record[0].id, ...record[0].fields };
    } catch (error) {
      if (error.error === 'NOT_FOUND') {
        return null;
      }
      throw new Error(`Failed to delete order: ${error.message}`);
    }
  }

  static async getByCustomerId(customerId) {
    try {
      const records = await ordersBase('Orders')
        .select({
          filterByFormula: `{customerId} = '${customerId}'`
        })
        .all();
      return records.map(record => ({ id: record.id, ...record.fields }));
    } catch (error) {
      throw new Error(`Failed to fetch orders for customer: ${error.message}`);
    }
  }

  static async getOrdersByBuyerId(buyerId) {
    try {
      const records = await ordersBase('Orders')
        .select({
          filterByFormula: `{buyerId} = '${buyerId}'`
        })
        .all();
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }));
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  static async getOrdersBySellerId(sellerId) {
    try {
      const records = await ordersBase('Orders')
        .select({
          filterByFormula: `{sellerId} = '${sellerId}'`
        })
        .all();
      return records.map(record => ({
        id: record.id,
        ...record.fields
      }));
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  static async getByBuyerId(buyerId) {
    try {
      console.log('Fetching orders for buyerId:', buyerId);
      const records = await ordersBase('Orders')
        .select({
          filterByFormula: `{buyerId} = '${buyerId}'`
        })
        .all();

      console.log('Found records:', records);

      return records.map(record => ({
        id: record.id,
        productId: record.fields.productId,
        productName: record.fields.productName,
        buyerId: record.fields.buyerId,
        sellerId: record.fields.sellerId,
        quantity: record.fields.quantity,
        totalAmount: record.fields.totalAmount,
        status: record.fields.status || 'pending',
        orderDate: record.fields.orderDate || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error in getByBuyerId:', error);
      throw error;
    }
  }

  static async getBySellerId(sellerId) {
    try {
      console.log('Fetching orders for sellerId:', sellerId);
      const records = await ordersBase('Orders')
        .select({
          filterByFormula: `{sellerId} = '${sellerId}'`
        })
        .all();

      console.log('Found records:', records);

      return records.map(record => ({
        id: record.id,
        productId: record.fields.productId,
        productName: record.fields.productName,
        buyerId: record.fields.buyerId,
        sellerId: record.fields.sellerId,
        quantity: record.fields.quantity,
        totalAmount: record.fields.totalAmount,
        status: record.fields.status || 'pending',
        orderDate: record.fields.orderDate || new Date().toISOString()
      }));
    } catch (error) {
      console.error('Error in getBySellerId:', error);
      throw error;
    }
  }
}

module.exports = Order;
