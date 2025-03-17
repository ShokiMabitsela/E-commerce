import { Router } from "express";
import {
  getUser,
  getAllUser,
  updateUser,
  removeUser,
} from "../controllers/userController.js";
import validateUpdate from "../middleware/validators/validateUpdate.js";
import { authorizeRoles, adminAuth } from "../middleware/adminAuth.js";

const userRouter = Router();

userRouter.get("/:id", authorizeRoles("Admin"), getUser);
userRouter.get("/" , authorizeRoles("Admin"), getAllUser);
userRouter.put(
  "/:id",
  adminAuth,
  authorizeRoles("Admin", "User"),
  validateUpdate,
  updateUser
);
 //do we need to verify this? YES
userRouter.delete("/:id", authorizeRoles("Admin"), removeUser);


export default userRouter;