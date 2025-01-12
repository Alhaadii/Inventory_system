import mongoose from "mongoose";

const URI = "mongodb://localhost:27017/Inventory";

export const connectDB = (req, res) => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/Inventory")
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.error("Connection failed", error);
      process.exit(1);
    });
};
