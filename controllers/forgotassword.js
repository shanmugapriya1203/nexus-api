import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendPasswordResetEmail = async (userEmail, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "priyamuthukumar1203@gmail.com",
      pass: "vyhg mayj azkw sugf", // Use App Passwords for security
    },
  });

  const mailOptions = {
    from: "priyamuthukumar1203@gmail.com",
    to: userEmail,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="http://yourwebsite.com/reset-password?token=${resetToken}">Reset Password</a>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    await sendPasswordResetEmail(email, resetToken);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
