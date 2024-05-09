import mongoose from 'mongoose';

const validRoles = ['user', 'volunteer', 'emergencyresponder', 'admin'];

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
  password: { type: String, required: true },
  role: { type: String, enum: validRoles, required: true },
  fullName: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String }, 
  profession: { type: String },
  experience: { type: String },
  mobileNumber: { type: String, match: /^\d{10}$/ },
  skills: { type: [String] },
  availabilityDropdown: { type: String },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
