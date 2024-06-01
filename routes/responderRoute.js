import express from "express";
import {
  createResponder,
  getAllResponders,
  getResponderById,
  updateResponder,
  deleteResponder,
} from "../controllers/responderController.js";
import { isVolunteer } from "../utils/isVolunteer.js";

const router = express.Router();

router.post("/", isVolunteer, createResponder);
router.get("/", isVolunteer, getAllResponders);
router.get("/:id", isVolunteer, getResponderById);
router.put("/:id", updateResponder);
router.delete("/:id", deleteResponder);
export default router;
