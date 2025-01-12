import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: false },
    email: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);
const customerModal = mongoose.model("Customers", schema);
export default customerModal;
