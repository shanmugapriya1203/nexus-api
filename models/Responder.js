import mongoose from "mongoose";

const responderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responderType: {
    type: String,
    required: true,
    enum: [
      "firefighter",
      "nurse",
      "doctor",
      "engineer",
      "paramedic",
      "technician",
      "police",
    ],
  },
  availability: {
    type: Boolean,
    default: true,
  },
});

const Responder = mongoose.model("Responder", responderSchema);

export default Responder;
