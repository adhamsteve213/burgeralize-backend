const { buildSchema } = require('graphql');
const Item = require('../models/item');
const Order = require('../models/order');

const schema = buildSchema(`
  type Item {
    id: ID!
    name: String!
    price: String!
    img: String!
  }

  type Order {
    id: ID!
    itemName: String!
    status: String!
  }

  type Query {
    items: [Item]
    item(id: ID!): Item
    orders: [Order]
    order(id: ID!): Order
  }

  type Mutation {
    createOrder(itemName: String!): Order
    updateOrderStatus(id: ID!, status: String!): Order
    deleteOrder(id: ID!): String
  }
`);

const root = {
  items: async () => {
    return await Item.find();
  },
  orders: async () => {
    return await Order.find();
  },
  createOrder: async ({ itemName }) => {
    const order = new Order({ itemName, status: 'Preparing' });
    return await order.save();
  },
  updateOrderStatus: async ({ id, status }) => {
    const order = await Order.findById(id);
    if (status) order.status = status;
    return await order.save();
  },
  deleteOrder: async ({ id }) => {
    await Order.findByIdAndDelete(id);
    return 'Order deleted';
  },
};

module.exports = { schema, root };