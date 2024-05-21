import express from "express";
import { donateSupplies } from "../controllers/donationController.js";

const router = express.Router();

router.post("/supplies", donateSupplies);

export default router;
