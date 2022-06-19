const cds = require('@sap/cds');
const queries = require('./helpers').queries;

module.exports = {
  async register() {
    const StoreService = await cds.connect.to('StoreService');
    StoreService.on('purchased', async (message) => {
      await queries.incrementSoldCount(message.data.item);
    });
  },
};
