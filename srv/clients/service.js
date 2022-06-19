const events = require('./events');
const clients = require('./clients');

module.exports = async function() {
  clients.register(this);
  await events.register();
};
