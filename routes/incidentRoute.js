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

const router = express.Router();

router.get("/responders", getAllResponders);
router.get("/incidents", getIncidentsByLocation);
router.get("/incidents", getIncidentsBySeverity);
router.post("/:incidentId/assign", assignIncidentToResponder);
router.put("/:incidentId/status", updateIncidentStatus);
router.post("/:userId", createIncident);
router.put("/:incidentId", updateIncident);
router.get("/:incidentId", getIncidentById);
router.get("/", getAllIncidents);
router.delete("/:incidentId", deleteIncident);

export default router;
