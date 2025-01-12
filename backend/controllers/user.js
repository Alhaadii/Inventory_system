import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModal from "../models/users.js";

// JWT Secret Key
const SECRET_KEY = "97593475893ishfhsdkfhahkhkhkjhksajfkajhdkfha";

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await userModal.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// Register a new user
export const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await userModal.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new userModal({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await userModal.findOne({ email }).select(-password);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, password } = req.body;

  try {
    // Hash the password if it exists in the update
    let updatedData = { name, email, phone };
    if (password) {
      updatedData.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await userModal.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModal.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

// get the total users as a function and export

export const getTotalUsers = async (req, res) => {
  try {
    const count = await userModal.countDocuments({});
    res.status(200).json({ total: count });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching Users count.",
      error: error.message,
    });
  }
};
