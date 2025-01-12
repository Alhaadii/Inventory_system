import express from "express";
import { totalCats } from "../controllers/categories.js";
import { countTotalCustomers } from "../controllers/customers.js";
import { countTotalOrders } from "../controllers/orders.js";
import { getTotalProducts } from "../controllers/products.js";
import { getTotalUsers } from "../controllers/user.js";

const router = express.Router();

router.get("/cats/count", totalCats);
router.get("/customers/count", countTotalCustomers);
router.get("/orders/count", countTotalOrders);
router.get("/products/count", getTotalProducts);
router.get("/users/count", getTotalUsers);

export default router;
