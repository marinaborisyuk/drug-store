const events = require('./events');
const items = require('./items');

module.exports = async function() {
  items.register(this);
  await events.register();
};
