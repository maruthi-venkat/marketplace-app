const Product = require('../models/Product');
const MyProduct = require('../models/MyProduct');
const { myProductsBase } = require('../config/airtable');

const syncProducts = async () => {
  try {
    const myProducts = await MyProduct.getAll();
    
    for (const myProduct of myProducts) {
      // Find matching product in Products table by name
      const mainProducts = await Product.findByName(myProduct.name);
      
      if (mainProducts && mainProducts.length > 0) {
        const mainProduct = mainProducts[0];
        
        // Update MyProduct with productId reference
        await myProductsBase('MyProducts').update([{
          id: myProduct.id,
          fields: {
            name: myProduct.name,
            description: myProduct.description,
            price: myProduct.price,
            image: myProduct.image,
            productId: mainProduct.id
          }
        }]);
      }
    }
    
    console.log('Products synchronized successfully');
  } catch (error) {
    console.error('Error syncing products:', error);
    throw error;
  }
};

module.exports = { syncProducts }; 