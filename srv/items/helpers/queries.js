const cds = require('@sap/cds');

/**
 * @param {string} ID Item ID
 */
async function incrementSoldCount(ID) {
  const item = await cds.run(
      SELECT
          .one
          .from(getEntityPath('Items'))
          .where({ID}),
  );

  await cds.run(
      UPDATE
          .entity(getEntityPath('Items'))
          .data({
            soldCount: item.soldCount + 1,
          })
          .where({ID}),
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
  incrementSoldCount,
};
