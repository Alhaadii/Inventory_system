import express from "express";
import {
  createCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
  getAllCustomers,
  countTotalCustomers,
} from "../controllers/customers.js";

const customerRouter = express.Router();

customerRouter.post("/", createCustomer);
customerRouter.get("/", getAllCustomers);
customerRouter.put("/:id", updateCustomer);
customerRouter.delete("/:id", deleteCustomer);
customerRouter.get("/count", countTotalCustomers);
customerRouter.get("/:id", getCustomer);
export default customerRouter;
