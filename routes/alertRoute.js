import express from "express";
import { getAllAlerts, createAlert } from "../controllers/alertController.js";

const router = express.Router();

router.get("/", getAllAlerts);
router.post("/", createAlert);

export default router;
