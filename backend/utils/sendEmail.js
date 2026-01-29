// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // ה-App Password שלך
    },
  });

  await transporter.sendMail({
    from: `"Daniel Website" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};
