import customerModal from "../models/customers.js";
// Create a new customer
export const createCustomer = async (req, res) => {
  try {
    const { name, phone, address, email } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const newCustomer = new customerModal({ name, phone, address, email });
    await newCustomer.save();

    res.status(201).json({
      message: "Customer created successfully",
      customer: newCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating customer", error: error.message });
  }
};

// Update an existing customer
export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, address, email } = req.body;

    const updatedCustomer = await customerModal.findByIdAndUpdate(
      id,
      { name, phone, address, email },
      { new: true, runValidators: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({
      message: "Customer updated successfully",
      customer: updatedCustomer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating customer", error: error.message });
  }
};

// Get a single customer by ID
export const getCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const customer = await customerModal.findById(id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ customer });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customer", error: error.message });
  }
};

// Delete a customer
export const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCustomer = await customerModal.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting customer", error: error.message });
  }
};

// Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModal.find();

    res.status(200).json({ customers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching customers", error: error.message });
  }
};

// Count Total Customers
export const countTotalCustomers = async (req, res) => {
  try {
    const totalCustomers = await customerModal.countDocuments();

    res.status(200).json({ totalCustomers });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error counting customers", error: error.message });
  }
};
