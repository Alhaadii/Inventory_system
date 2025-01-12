import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getTotalProducts,
} from "../controllers/products.js";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/total", getTotalProducts);

export default productRouter;
