import Airtable from 'airtable';

// Initialize Airtable
const base = new Airtable({
  apiKey: 'your_airtable_api_key'
}).base('your_base_id');

export const productsBase = base;
export const ordersBase = base;

export default base; 