import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateToken } from '../utils/authUtils.js';

export const register = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      const error = new Error('Username or email already exists');
      error.statusCode = 400;
      throw error;
    }

    // Hash the password
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
      isAdmin: req.body.isAdmin || false, // Set isAdmin to false if not provided
      profession: req.body.profession,
      experience: req.body.experience,
      skills: req.body.skills,
      availabilityDropdown: req.body.availabilityDropdown
    });

    const savedUser = await newUser.save();

    // Generate a jwt token if we need immediate authentication or confirmation email sent to user email we need token here in register
    const token = generateToken({ id: savedUser._id, username: savedUser.username });
    res.status(201).json({ message: 'User registered successfully', token, savedUser });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken({ id: user._id, username: user.username });

    res.status(200).json({
      message: 'Login successful',
      token,
      user
    });
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};
