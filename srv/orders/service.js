const orders = require('./orders');

module.exports = function() {
  orders.register(this);
};
