import express from "express";
import User from "../models/userModel.js"
import { loginUser, registerUser, adminLogin } from "../controllers/userController.js";  // Correct path with .js extension

const userRouter = express.Router();

// User registration route
userRouter.post("/register", registerUser);

// User login route
userRouter.post("/login", loginUser);

// Admin login route
userRouter.post("/admin", adminLogin);

// Optionally, if you want to retrieve users (example: Get all users)
userRouter.get("/", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database (make sure User model is correctly imported)
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

export default userRouter;
