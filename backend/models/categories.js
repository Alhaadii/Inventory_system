import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CategoryModal = mongoose.model("Categories", categorySchema);

export default CategoryModal;
