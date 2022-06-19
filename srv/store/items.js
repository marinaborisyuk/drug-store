/* eslint-disable no-unused-vars */
const EntityLogger = require('../common').helpers.logging.EntityLogger;

module.exports = {
  register(srv) {
    srv.after(['READ'], 'Items', (each, req) => {
    });
  },
};
