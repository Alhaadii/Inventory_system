import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    items: [
      // have _id of the product and quantity
      {
        _id: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    orderedBy: { type: Schema.Types.ObjectId, ref: "User" },
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

module.exports = mongoose.model("Orders", schema);
