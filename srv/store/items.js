/* eslint-disable no-unused-vars */
const EntityLogger = require('../common').helpers.logging.EntityLogger;

module.exports = {
  register(srv) {
    srv.after(['READ'], 'Items', (each, req) => {
      const logger = new EntityLogger(req, srv.name);

      logger.pushReadMessage({
        name: 'Items',
        id: each.ID ?? 'unknown',
        attributes: Object.keys(each),
      });
    });
    srv.before(['CREATE', 'UPDATE', 'DELETE'], 'Clients', (req) => {
      const order = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateAttemptMessage({
        name: 'Clients',
        id: order.ID ?? 'unknown',
        attributes: Object.keys(order),
      });
    });

    srv.after(['CREATE', 'UDPATE', 'DELETE'], 'Clients', (_, req) => {
      const order = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateFinishMessage({
        name: 'Clients',
        id: order.ID ?? 'unknown',
        attributes: Object.keys(order),
      });
    });
  },
};
