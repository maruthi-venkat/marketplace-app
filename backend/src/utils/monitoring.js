const monitoring = {
  logDatabaseOperation: async (operation, tableName, data) => {
    console.log(`[${new Date().toISOString()}] ${operation} on ${tableName}:`, 
      JSON.stringify(data));
  },

  handleDatabaseError: (error, operation) => {
    console.error(`Database error during ${operation}:`, error);
    // You could send this to an error tracking service
  }
};

module.exports = monitoring; 