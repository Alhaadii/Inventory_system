import CategoryModal from "../models/categories.js";
import productModal from "../models/products.js";

export const createProduct = async (req, res) => {
  try {
    const { category, cost, quantity, ...rest } = req.body;
    //check if the prodcut is already available
    const existingProduct = await productModal.findOne({ ...rest });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with these details already exists" });
    }

    // Validate required fields
    if (!cost || !quantity) {
      return res
        .status(400)
        .json({ message: "Cost and quantity are required fields" });
    }

    // Ensure `cost` and `quantity` are numbers
    const numericCost = parseFloat(cost);
    const numericQuantity = parseInt(quantity);

    if (isNaN(numericCost) || isNaN(numericQuantity)) {
      return res
        .status(400)
        .json({ message: "Cost and quantity must be valid numbers" });
    }

    // Find category by name or ID
    const existingCategory = await CategoryModal.findOne({ name: category });
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Calculate total
    const total = numericCost * numericQuantity;

    // Create the product
    const product = new productModal({
      category: existingCategory._id,
      cost: numericCost,
      quantity: numericQuantity,
      total,
      ...rest,
    });

    await product.save();
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    console.error("Error in createProduct:", error);
    res
      .status(500)
      .json({ message: "Failed to create product", error: error.message });
  }
};

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await productModal.find().populate("category");
    res.status(200).json(products);
  } catch (error) {
    console.error("Error in [function name]:", error);
    res
      .status(500)
      .json({ message: "Failed to [operation]", error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, cost, quantity, salesprice, description, category } = req.body;

  try {
    let categoryObj = null;
    if (category) {
      categoryObj = await CategoryModal.findOne({ name: category }); // Lookup by name
      if (!categoryObj) {
        return res.status(404).json({ message: "Category not found" });
      }
    }

    const total = cost * quantity;

    const updatedProduct = await productModal.findByIdAndUpdate(
      id,
      {
        name,
        cost,
        quantity,
        salesprice,
        description,
        total,
        category: categoryObj ? categoryObj._id : undefined,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in updateProduct:", error);
    res
      .status(500)
      .json({ message: "Failed to update product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await productModal.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

// Get the total number of products
export const getTotalProducts = async (req, res) => {
  try {
    const totalProducts = await productModal.countDocuments();
    res.status(200).json({ total: totalProducts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product count", error });
  }
};
