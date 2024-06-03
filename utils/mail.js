import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });
  await transporter.sendMail({
    from: "myId@gmail.com",
    to,
    subject,
    text,
  });
};
