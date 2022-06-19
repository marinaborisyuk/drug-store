const EntityLogger = require('../common').helpers.logging.EntityLogger;

module.exports = {
  register(srv) {
    srv.after(['READ'], 'Orders', (each, req) => {
      const logger = new EntityLogger(req, srv.name);

      logger.pushReadMessage({
        name: 'Orders',
        id: each.ID ?? 'unknown',
        attributes: Object.keys(each),
      });
    });

    srv.before(['CREATE', 'UPDATE', 'DELETE'], 'Orders', (req) => {
      const order = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateAttemptMessage({
        name: 'Orders',
        id: order.ID ?? 'unknown',
        attributes: Object.keys(order),
      });
    });

    srv.after(['CREATE', 'UDPATE', 'DELETE'], 'Orders', (_, req) => {
      const order = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateFinishMessage({
        name: 'Orders',
        id: order.ID ?? 'unknown',
        attributes: Object.keys(order),
      });
    });
  },
};
