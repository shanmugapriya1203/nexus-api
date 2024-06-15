import express from "express";
import {
  createResponder,
  getAllResponders,
  getResponderById,
  updateResponder,
  deleteResponder,
} from "../controllers/responderController.js";

const router = express.Router();

router.get("/:id", getResponderById);
router.put("/:id", updateResponder);
router.delete("/:id", deleteResponder);
router.post("/", createResponder);
router.get("/", getAllResponders);
export default router;
