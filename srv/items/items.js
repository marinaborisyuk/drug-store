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

    srv.before(['CREATE', 'UPDATE', 'DELETE'], 'Items', (req) => {
      const item = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateAttemptMessage({
        name: 'Items',
        id: item.ID ?? 'unknown',
        attributes: Object.keys(item),
      });
    });

    srv.after(['CREATE', 'UDPATE', 'DELETE'], 'Items', (_, req) => {
      const item = req.data;

      const logger = new EntityLogger(req, srv.name);

      logger.pushUpdateFinishMessage({
        name: 'Items',
        id: item.ID ?? 'unknown',
        attributes: Object.keys(item),
      });
    });
  },
};
