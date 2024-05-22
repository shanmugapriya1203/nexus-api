import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import twilio from "twilio";
import dotenv from "dotenv";
import User from "../models/User.js";
import { generateToken } from "../utils/authUtils.js";
import Responder from "../models/Responder.js";

dotenv.config();

const otpStore = {};

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const requestOtp = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;
    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    otpStore[mobileNumber] = otp;
    await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobileNumber,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    if (error.code === 21608) {
      res
        .status(400)
        .json({ message: "Invalid phone number or region not supported" });
    } else {
      next(error);
    }
  }
};

export const verifyOtp = async (req, res, next) => {
  try {
    const { mobileNumber, otp } = req.body;
    if (otpStore[mobileNumber] === otp) {
      delete otpStore[mobileNumber];
      res.status(200).json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    next(error);
  }
};
export const register = async (req, res, next) => {
  try {
    const existingUserByUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUserByUsername) {
      const error = new Error("Username already exists");
      error.statusCode = 400;
      throw error;
    }
    const existingUserByEmail = await User.findOne({ email: req.body.email });
    if (existingUserByEmail) {
      const error = new Error("Email already exists");
      error.statusCode = 400;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      role: req.body.role,
      age: req.body.age,
      city: req.body.city,
      area: req.body.area,
      isAdmin: req.body.isAdmin || false,
      profession: req.body.profession,
      experience: req.body.experience,
      skills: req.body.skills,
      availabilityDropdown: req.body.availabilityDropdown,
      profilePicture:
        req.body.profilePicture ||
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
    });

    const savedUser = await newUser.save();

    if (req.body.role === "emergencyresponder" && req.body.profession) {
      const validResponderTypes = [
        "firefighter",
        "nurse",
        "doctor",
        "engineer",
        "paramedic",
        "technician",
      ];

      const responderType = validResponderTypes.includes(req.body.profession)
        ? req.body.profession
        : undefined;

      if (responderType) {
        const responder = new Responder({
          user: savedUser._id,
          responderType: responderType,
        });
        await responder.save();
      }
    }
    const token = generateToken({
      id: savedUser._id,
      username: savedUser.username,
    });

    res
      .status(201)
      .json({
        message: "User registered successfully",
        token,
        user: savedUser,
      });
  } catch (error) {
    if (error.code === 11000) {
      if (error.keyPattern.username) {
        res.status(400).json({ message: "Username already exists" });
      } else if (error.keyPattern.email) {
        res.status(400).json({ message: "Email already exists" });
      } else {
        res.status(400).json({ message: "Duplicate key error" });
      }
    } else {
      next(error);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({ id: user._id, username: user.username });

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};
