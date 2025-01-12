import CategoryModal from "../models/categories.js";

// Create a new category
export const createCat = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const category = new CategoryModal({ name });
    await category.save();

    res
      .status(201)
      .json({ message: "Category created successfully.", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating category.", error: error.message });
  }
};

// Get all categories
export const getCats = async (req, res) => {
  try {
    const categories = await CategoryModal.find();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching categories.", error: error.message });
  }
};

// Update a category by ID
export const updateCats = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Category name is required." });
    }

    const updatedCategory = await CategoryModal.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({
      message: "Category updated successfully.",
      category: updatedCategory,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating category.", error: error.message });
  }
};

// Delete a category by ID
export const deleteCats = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await CategoryModal.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json({ message: "Category deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting category.", error: error.message });
  }
};

// Get the total count of categories
export const totalCats = async (req, res) => {
  try {
    const count = await CategoryModal.countDocuments();
    res.status(200).json({ total: count });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching category count.",
      error: error.message,
    });
  }
};

// Get a category by ID

export const getCatById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await CategoryModal.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    res.status(200).json(category);
  } catch (error) {
    res
     .status(500)
     .json({ message: "Error fetching category.", error: error.message });
  }
};
