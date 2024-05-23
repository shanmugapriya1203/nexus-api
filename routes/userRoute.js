import express from "express";
import {
  getTotalUsers,
  getUserById,
  signOut,
  updateUser,
  updateUserRole,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/authUtils.js";
import { forgotPassword } from "../controllers/forgotassword.js";

const router = express.Router();

router.get("/get/:id", getUserById);
router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signOut);
router.post("/forgot-password", forgotPassword);
router.get("/getall", getTotalUsers);
router.put("/updaterole", updateUserRole);
export default router;
