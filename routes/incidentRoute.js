import express from "express";
import {
  createIncident,
  updateIncident,
  getIncidentById,
  getAllIncidents,
  deleteIncident,
  getAllResponders,
  assignIncidentToResponder,
  updateIncidentStatus,
  getIncidentsByLocation,
  getIncidentsBySeverity,
} from "../controllers/incidentController.js";
import { isAdmin } from "./../utils/authMiddleware.js";
const router = express.Router();

router.get("/responders", getAllResponders);
router.get("/incidents", getIncidentsByLocation);
router.get("/incidents", getIncidentsBySeverity);
router.post("/:incidentId/assign", isAdmin, assignIncidentToResponder);
router.put("/:incidentId/status", updateIncidentStatus);
router.post("/:userId", isAdmin, createIncident);
router.put("/:incidentId", isAdmin, updateIncident);
router.get("/:incidentId", getIncidentById);
router.get("/", getAllIncidents);
router.delete("/:incidentId", isAdmin, deleteIncident);

export default router;
