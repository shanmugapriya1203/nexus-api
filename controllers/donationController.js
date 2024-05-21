import Donation from "../models/Donation.js";

export const donateSupplies = async (req, res) => {
  const { type, quantity, contactInfo, description } = req.body;

  try {
    const newDonation = new Donation({
      type,
      quantity,
      contactInfo,
      description,
    });

    await newDonation.save();
    res.status(200).json({ message: "Donation submitted successfully!" });
  } catch (error) {
    console.error("Error submitting donation:", error);
    res.status(500).json({ message: "Failed to submit donation." });
  }
};
