const Orders = require("../models/orders");
const Products = require("../models/products");
const Customers = require("../models/customers");

exports.getMeta = async (req, res) => {
  try {
    const findAll = await Products.find({}).populate("category");
    res.status(200).json(findAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  const orders = await Orders.find().populate("customer").populate("orderedBy");

  res.status(200).json(orders);
};

exports.getOrder = async (req, res) => {
  const order = await Orders.findById(req.params.id)
    .populate("items")
    .populate("customer")
    .populate("orderedBy");

  res.status(200).json(order);
};

exports.createOrder = async (req, res) => {
  try {
    for (const item of req.body.items) {
      const product = await Products.findById(item._id);
      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Product ${product.name} is out of stock`,
        });
      }
    }

    const newOrder = new Orders(req.body);
    await newOrder.save();

    for (const item of newOrder.items) {
      const product = await Products.findById(item._id).exec();
      product.quantity = product.quantity - item.quantity;
      await product.save();
    }

    res.status(201).json({
      message: "Order created successfully",
      ...newOrder._doc,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateOrder = async (req, res) => {
  const updatedOrder = await Orders.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedOrder) {
    return res.status(400).json({
      message: "Order does not exist",
    });
  }

  res.status(200).json({
    message: "Order updated successfully",
    ...updatedOrder._doc,
  });
};

exports.deleteOrder = async (req, res) => {
  //  find order if is exist or show error message
  const order = await Orders.findById(req.params.id);
  if (!order) {
    return res.status(400).json({
      message: "Order does not exist",
    });
  }
  //  delete order
  await Orders.deleteOne();
  res.status(200).json({
    message: "Order deleted successfully",
  });
};

// get collection count total orders
exports.totalOrder = async (req, res) => {
  try {
    const count = await Orders.countDocuments({});
    res.status(200).json(count);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await Orders.deleteMany({});
    res.status(200).json({
      message: "All orders deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
