import Alert from "../models/Alert.js";

// Get all alerts
export const getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.json(alerts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAlert = async (req, res) => {
  const alert = new Alert({
    type: req.body.type,
    message: req.body.message,
  });

  try {
    const newAlert = await alert.save();
    req.io.emit("newAlert", newAlert);
    res.status(201).json(newAlert);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
