import express from "express";
import {
  countTotalOrders,
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrder,
  updateOrder,
} from "../controllers/orders.js";
const ordersRouter = express.Router();

ordersRouter.get("/", getAllOrders);
ordersRouter.get("/:id", getOrder);
ordersRouter.post("/", createOrder);
ordersRouter.put("/:id", updateOrder);
ordersRouter.delete("/:id", deleteOrder);
ordersRouter.get("/count/total", countTotalOrders);

export default ordersRouter;
