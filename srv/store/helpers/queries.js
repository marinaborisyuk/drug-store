const cds = require('@sap/cds');

/**
 * @param {string} ID UUID of the client
 * @param {Array<string>} fields Fields of client to return
 * @return {Promise<object|null>} client
 */
async function getClient(
    ID,
    fields = ['ID'],
) {
  if (!ID) {
    return;
  }

  return cds
      .run(
          SELECT
              .one
              .from(getEntityPath('Clients'))
              .columns(fields)
              .where({ID}),
      );
}

/**
 * @param {string} ID UUID of the item
 * @param {Array<string>} fields Fields of item to return
 * @return {Promise<object|null>} item
 */
async function getItem(
    ID,
    fields = ['ID'],
) {
}

/**
 * @param {object} order Order fields
 */
async function createOrder(order) {
  if (!order.ID) {
    throw new Error('Order ID is required');
  }

  await cds
      .run(
          INSERT
              .into(getEntityPath('Orders'))
              .entries(order),
      );
}


/**
 * @param {string} tableName
 * @return {string} DB table name
 */
function getEntityPath(tableName) {
  return `db.store.${tableName}`;
}

module.exports = {
  getClient,
  getItem,
  createOrder,
};
