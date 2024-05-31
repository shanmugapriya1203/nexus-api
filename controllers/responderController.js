import Responder from "../models/Responder.js";

export const createResponder = async (req, res) => {
  try {
    const { name, location, mobileNumber, profession } = req.body;
    const createdBy = req.user._id;

    const newResponder = new Responder({
      name,
      location,
      mobileNumber,
      profession,
      createdBy,
    });

    const savedResponder = await newResponder.save();
    res.status(201).json(savedResponder);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllResponders = async (req, res) => {
  try {
    const responders = await Responder.find().populate("createdBy");
    res.status(200).json(responders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getResponderById = async (req, res) => {
  try {
    const responder = await Responder.findById(req.params.id).populate(
      "createdBy"
    );
    if (!responder)
      return res.status(404).json({ message: "Responder not found" });
    res.status(200).json(responder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
