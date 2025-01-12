import mongoose from "mongoose";
import ordersModal from "../models/orders.js";
import productModal from "../models/products.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const { items, customer, orderedBy, paymentMethod, paymentStatus } =
      req.body;

    // Calculate total explicitly
    let total = 0;
    for (const item of items) {
      const product = await productModal.findById(item.productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product not found: ${item.productId}` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient quantity for product: ${product.name}`,
        });
      }

      // Subtract quantity from product
      product.quantity -= item.quantity;
      await product.save();

      // Calculate total price for the item
      total += item.quantity * item.price;
    }

    // Create order
    const order = new ordersModal({
      items,
      total,
      customer,
      orderedBy,
      paymentMethod,
      paymentStatus,
    });

    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: error.message });
  }
};

// Update an existing order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { items, customer, orderedBy, paymentMethod, paymentStatus } =
      req.body;

    // Calculate total explicitly
    let total = 0;
    for (const item of items) {
      total += item.quantity * item.price;
    }

    const updatedOrder = await ordersModal.findByIdAndUpdate(
      id,
      { items, total, customer, orderedBy, paymentMethod, paymentStatus },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res
      .status(200)
      .json({ message: "Order updated successfully", order: updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update order", error: error.message });
  }
};

// Delete an order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await ordersModal.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Optionally, restock products if desired
    for (const item of deletedOrder.items) {
      const product = await productModal.findById(item.productId);
      if (product) {
        product.quantity += item.quantity;
        await product.save();
      }
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete order", error: error.message });
  }
};

// Get a single order by ID
export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await ordersModal
      .findById(id)
      .populate("customer")
      .populate("orderedBy")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch order", error: error.message });
  }
};

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await ordersModal
      .find()
      .populate("customer")
      .populate("orderedBy")
      .populate("items.productId");

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders", error: error.message });
  }
};

// Count total orders
export const countTotalOrders = async (req, res) => {
  try {
    const totalOrders = await ordersModal.countDocuments();

    res.status(200).json({ totalOrders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to count orders", error: error.message });
  }
};
