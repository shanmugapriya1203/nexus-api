import express from "express";
import {
  getUserById,
  signOut,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/authUtils.js";
import { forgotPassword } from "../controllers/forgotassword.js";

const router = express.Router();

router.get("/get/:id", getUserById);
router.put("/update/:userId", verifyToken, updateUser);
router.post("/signout", signOut);
router.post("/forgot-password", forgotPassword);

export default router;
