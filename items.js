const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  img: { type: String, required: true },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;