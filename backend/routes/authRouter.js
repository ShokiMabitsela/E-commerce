import express from "express"; // Import express to access Router
import {
  registerHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/authController.js";
import validateRegister from "../middleware/validators/validateRegister.js";
import validateLogin from "../middleware/validators/validateLogin.js";
import { adminAuth } from "../middleware/adminAuth.js";

const authRouter = express.Router(); // Create the Router using express

authRouter.post("/register", validateRegister, registerHandler);
authRouter.post("/login", validateLogin, loginHandler);
authRouter.get("/logout", adminAuth, logoutHandler);

export default authRouter;
