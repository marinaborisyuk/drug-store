/* eslint-disable no-unused-vars */
const queries = require('./helpers').queries;
const uuid = require('uuid');

module.exports = {
  /**
   * @param {cds.Service} srv
   */
  register(srv) {
    srv.on('purchase', async (req) => {
      const {client, item} = req.data;
      await checkIDs(client, item);
      await pushOrder(client, item);
      // await srv.emit('purchased', {client, item});
    });
  },
};

/**
 * Checks the existence of a following entities
 * @param {string} clientID UUID
 * @param {string} itemID UUID
 */
async function checkIDs(clientID, itemID) {
}

/**
 * Creates a new order
 * @param {string} clientID UUID
 * @param {string} itemID UUID
 */
async function pushOrder(clientID, itemID) {
}
