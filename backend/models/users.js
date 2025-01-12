import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, unique: true, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const userModal = mongoose.model("Users", schema);
export default userModal;
