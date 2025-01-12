import express from "express";
import {
  createCat,
  getCats,
  updateCats,
  deleteCats,
  totalCats,
  getCatById,
} from "../controllers/categories.js";

const catRouter = express.Router();

// Create a category
catRouter.post("/", createCat);

// Get all categories
catRouter.get("/", getCats);

// Update a category by ID
catRouter.put("/:id", updateCats);

// Delete a category by ID
catRouter.delete("/:id", deleteCats);

// Get the total count of categories
catRouter.get("/total", totalCats);
catRouter.get("/:id", getCatById)

export default catRouter;
