import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    salesprice: { type: Number, requireed: true },
    description: { type: String, required: true },
    total: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
  },
  {
    timestamps: true,
  }
);
const productModal = mongoose.model("Products", schema);

export default productModal;
