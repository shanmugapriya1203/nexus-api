import express from "express";
import {
  createResponder,
  getAllResponders,
  getResponderById,
} from "../controllers/responderController.js";
import { isVolunteer } from "../utils/isVolunteer.js";

const router = express.Router();

router.post("/", isVolunteer, createResponder);
router.get("/", isVolunteer, getAllResponders);
router.get("/:id", isVolunteer, getResponderById);

export default router;
