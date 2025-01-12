import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customers" },
    orderedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    paymentMethod: { type: String, default: "cash" },
    paymentStatus: {
      type: String,
      required: false,
      default: "pending",
      enum: ["pending", "paid", "cancelled", "refunded"],
    },
  },
  {
    timestamps: true,
  }
);
const ordersModal = mongoose.model("Orders", schema);

export default ordersModal;
