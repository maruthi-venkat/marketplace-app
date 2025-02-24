const Airtable = require('airtable');
require('dotenv').config();

const productsBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID_PRODUCTS);

const myProductsBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID_MY_PRODUCTS);

const ordersBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID_ORDERS);

const usersBase = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY
}).base(process.env.AIRTABLE_BASE_ID_USERS);
// Add error handling and connection validation
const validateConnection = async () => {
  try {
    // Test the connection by fetching a single record
    await productsBase('Products').select({ maxRecords: 1 }).firstPage();
    await ordersBase('Orders').select({ maxRecords: 1 }).firstPage();
    await usersBase('Users').select({ maxRecords: 1 }).firstPage();
    console.log('Successfully connected to Airtable');
  } catch (error) {
    console.error('Failed to connect to Airtable:', error);
    throw error;
  }
};

module.exports = { 
  productsBase, 
  myProductsBase,
  ordersBase,
  usersBase,
  validateConnection 
};