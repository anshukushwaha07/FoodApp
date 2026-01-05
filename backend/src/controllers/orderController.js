import mongoose from "mongoose";
import Order from "../models/Order.js";
import Food from "../models/Food.js";
import Restaurant from "../models/Restaurant.js";

/**
 * 🛒 Place Order
 */
export const placeOrder = async (req, res) => {
  const { user, restaurant, items } = req.body;

  // Validate ObjectIds
  if (
    !mongoose.Types.ObjectId.isValid(user) ||
    !mongoose.Types.ObjectId.isValid(restaurant)
  ) {
    return res.status(400).json({ message: "Invalid user or restaurant ID" });
  }

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Order items are required" });
  }

  const restaurantExists = await Restaurant.findById(restaurant);
  if (!restaurantExists) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  // Calculate total
  let totalAmount = 0;

  for (const item of items) {
    if (!mongoose.Types.ObjectId.isValid(item.food)) {
      return res.status(400).json({ message: "Invalid food ID" });
    }

    const food = await Food.findById(item.food);
    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    totalAmount += food.price * item.quantity;
  }

  const order = await Order.create({
    user,
    restaurant,
    items,
    totalAmount,
  });

  res.status(201).json(order);
};

/**
 * 📃 Get Orders by User
 */
export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.params.userId })
    .populate("restaurant", "name")
    .populate("items.food", "name price");

  res.json(orders);
};

/**
 * 🔍 Get Single Order
 */
export const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "phone")
    .populate("restaurant", "name address")
    .populate("items.food", "name price");

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
};

/**
 * 🧑‍💼 Get All Orders (Admin)
 */
export const getAllOrders = async (req, res) => {
  const orders = await Order.find()
    .populate("user", "phone")
    .populate("restaurant", "name")
    .sort({ createdAt: -1 });

  res.json(orders);
};

/**
 * 🔄 Update Order Status (Admin)
 */
export const updateOrderStatus = async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.status = status;
  await order.save();

  res.json(order);
};

/**
 * ❌ Cancel Order (User)
 */
export const cancelOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.status === "delivered") {
    return res.status(400).json({
      message: "Delivered order cannot be cancelled",
    });
  }

  order.status = "cancelled";
  await order.save();

  res.json(order);
};
