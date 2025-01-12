import express from "express";
import userRouter from "./routes/users.js";
import { connectDB } from "./config/connection.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import catRouter from "./routes/categories.js";
import productRouter from "./routes/products.js";
import customerRouter from "./routes/customers.js";
import ordersRouter from "./routes/orders.js";
import router from "./routes/home.js";
const app = express();
const port = 8000;
app.use(express.json());
// app.use(cookieParser);
app.use(cors());

// Import routes
app.use("/users", userRouter);
app.use("/cats", catRouter);
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", ordersRouter);
app.use("/home", router)
app.get("/", (req, res) => {
  res.send("Hello! Welcome to Inventory Management System...");
});
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`); // listening on port 8000
});
