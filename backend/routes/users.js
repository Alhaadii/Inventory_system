import express from "express";
import {
  deleteUser,
  getTotalUsers,
  getUsers,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/user.js";
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/", registerUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", loginUser);
userRouter.get("/total", getTotalUsers);

export default userRouter;
