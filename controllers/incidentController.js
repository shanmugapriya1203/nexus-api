import Incident from "../models/Incident.js";
import Responder from "../models/Responder.js";
import User from "../models/User.js";

export const createIncident = async (req, res) => {
  try {
    const {
      type,
      location,
      description,
      severity,
      requiredResponderTypes,
      requiredResponderQuantity,
      assignedResponder,
    } = req.body;
    const createdBy = req.params.userId;

    const incident = new Incident({
      type,
      location,
      description,
      severity,
      createdBy,
      requiredResponderTypes,
      requiredResponderQuantity,
      assignedResponder,
    });

    const savedIncident = await incident.save();

    req.io.emit("emergency", {
      type: "newIncident",
      data: savedIncident,
    });

    res.status(201).json(savedIncident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const updateIncident = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const {
      type,
      location,
      description,
      severity,
      requiredResponderTypes,
      requiredResponderQuantity,
      assignedResponder,
    } = req.body;

    const updatedIncident = await Incident.findByIdAndUpdate(
      incidentId,
      {
        type,
        location,
        description,
        severity,
        requiredResponderTypes,
        requiredResponderQuantity,
        assignedResponder,
      },
      { new: true }
    );

    if (!updatedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(updatedIncident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json(incident);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find({});
    res.status(200).json(incidents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const deletedIncident = await Incident.findByIdAndDelete(incidentId);

    if (!deletedIncident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    res.status(200).json({
      message: "Incident deleted successfully",
      incident: deletedIncident,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllResponders = async (req, res) => {
  try {
    const responders = await Responder.find({}).populate(
      "user",
      "username email fullName area city"
    );
    res.status(200).json(responders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const assignIncidentToResponder = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { responderId } = req.body;
    const incident = await Incident.findOneAndUpdate(
      { _id: incidentId },
      { assignedResponder: responderId },
      { new: true }
    );

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }
    const responder = await Responder.findByIdAndUpdate(
      responderId,
      { $addToSet: { assignedIncidents: incidentId } },
      { new: true }
    );

    if (!responder) {
      return res.status(404).json({ message: "Responder not found" });
    }
    const user = await User.findByIdAndUpdate(
      responder.user,
      { $addToSet: { assignedIncidents: incidentId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Incident assigned to responder successfully",
      incident,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateIncidentStatus = async (req, res) => {
  try {
    const { incidentId } = req.params;
    const { status } = req.body;

    console.log("Incident ID:", incidentId);
    console.log("Status:", status);

    const incident = await Incident.findById(incidentId);
    console.log("Incident:", incident);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found" });
    }

    if (status === "Closed") {
      const user = await Responder.findByIdAndUpdate(
        incident.assignedResponder,
        { $inc: { points: 10 } },
        { new: true }
      );

      console.log("User:", user);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    }

    incident.status = status;
    await incident.save();

    res.status(200).json({ message: "Incident status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIncidentsByLocation = async (req, res) => {
  try {
    const { location } = req.query;

    const incidents = await Incident.find({ location });

    res.status(200).json({ incidents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getIncidentsBySeverity = async (req, res) => {
  try {
    const { severity } = req.query;
    const incidents = await Incident.find({ severity });

    res.status(200).json({ incidents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
