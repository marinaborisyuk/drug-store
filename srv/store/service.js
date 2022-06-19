const actions = require('./actions');
const items = require('./items');

module.exports = function() {
  actions.register(this);
  items.register(this);
};
