import mongoose from "mongoose";

const validRoles = ["user", "volunteer", "emergencyresponder", "admin"];

const certificationSchema = new mongoose.Schema({
  certificationName: { type: String, required: true },
  certificationDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
});

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: { type: String, required: true },
    role: { type: String, enum: validRoles, required: true },
    fullName: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    age: { type: Number, required: true },
    bloodGroup: { type: String },
    profession: { type: String },
    experience: { type: String },
    mobileNumber: { type: String },
    skills: { type: [String] },
    availabilityDropdown: { type: String },
    isAdmin: { type: Boolean, default: false },
    responderType: { type: String, default: "defaultType" },
    certifications: [certificationSchema],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
