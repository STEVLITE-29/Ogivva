import nodemailer from 'nodemailer';
import { verifyEmail } from "./emailTemplates";

// Define all the email sending functions here
// Function to send verification email to the user after signup
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  // Setup nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // My Email doing the sending
      pass: process.env.PASS, // App password from environment variable
    },
  });

  // Mail options
  const mailOptions = {
    from: '"Ogivva" <OgivvaTeam>',
    to: email,
    subject: 'Verify Your Ogivva Account',
    html: verifyEmail(verificationToken),
  };

  // Send email and catch errors
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (err) {
    console.error('Error sending verification email:', err);
  }
};
