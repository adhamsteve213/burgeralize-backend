const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  status: { type: String, required: true },
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;