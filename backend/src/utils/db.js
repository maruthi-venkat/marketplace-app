const { productsBase, ordersBase } = require('../config/airtable');

// Generic database operations
const db = {
  // Create a record in any table
  async create(base, tableName, data) {
    try {
      const records = await base(tableName).create([{ fields: data }]);
      return { id: records[0].id, ...records[0].fields };
    } catch (error) {
      throw new Error(`Database create error: ${error.message}`);
    }
  },

  // Fetch records with pagination
  async fetch(base, tableName, options = {}) {
    try {
      const records = await base(tableName)
        .select({
          maxRecords: options.limit || 100,
          view: options.view || 'Grid view',
          filterByFormula: options.filter,
          sort: options.sort
        })
        .all();
      return records.map(record => ({ id: record.id, ...record.fields }));
    } catch (error) {
      throw new Error(`Database fetch error: ${error.message}`);
    }
  },

  // Transaction helper
  async transaction(operations) {
    try {
      const results = await Promise.all(operations);
      return results;
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
};

module.exports = db; 