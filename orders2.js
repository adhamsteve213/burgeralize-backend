const { buildSchema } = require('graphql');

// GraphQL schema
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
    createItem(name: String!, price: String!, img: String!): Item
    updateItem(id: ID!, name: String, price: String, img: String): Item
    deleteItem(id: ID!): String
    createOrder(itemName: String!): Order
    updateOrderStatus(id: ID!, status: String!): Order
    deleteOrder(id: ID!): String
  }
`);

// GraphQL resolvers
const Item = require('./models/item');
const Order = require('./models/order');

const root = {
  items: async () => {
    return await Item.find();
  },
  item: async ({ id }) => {
    return await Item.findById(id);
  },
  orders: async () => {
    return await Order.find();
  },
  order: async ({ id }) => {
    return await Order.findById(id);
  },
  createItem: async ({ name, price, img }) => {
    const item = new Item({ name, price, img });
    return await item.save();
  },
  updateItem: async ({ id, name, price, img }) => {
    const item = await Item.findById(id);
    if (name) item.name = name;
    if (price) item.price = price;
    if (img) item.img = img;
    return await item.save();
  },
  deleteItem: async ({ id }) => {
    await Item.findByIdAndDelete(id);
    return 'Item deleted';
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
  }
};

module.exports = { schema, root };