import nodemailer from 'nodemailer';
import { verifyEmailTemplate, welcomeEmailTemplate, resetPasswordTemplate, resetPasswordSuccessEmailTemplate } from "./emailTemplates";

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
    from: `"Ogivva" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Verify Your Ogivva Account',
    html: verifyEmailTemplate(verificationToken),
  };

  // Send email and catch errors
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (err) {
    console.error('Error sending verification email:', err);
  }
};

export const welcomeEmail = async (
  name: string,
  email: string
): Promise<void> => {
  // setup node transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // My Email doing the sending
      pass: process.env.PASS, // App password from environment variable
    },
  });

  // Mail options 
  const mailOptions = {
    from: `"Ogivva" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Welcome to Ogivva!!',
    html: welcomeEmailTemplate(name)
  }

  // Send email and catch errors
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent:', info.response);
  } catch (err) {
    console.error('Error sending Welcome email:', err);
  }
}

export const sendResetPasswordEmail = async (
  email: string,
  name: string,
  resetUrl: string
): Promise<void> => {
  // Setup nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // My Email doing the sending
      pass: process.env.PASS, // App password from environment variable
    }})

  // Mail options
  const mailOptions = {
    from: `"Ogivva" <${process.env.EMAIL}>`,
    to: email,
    subject: "Reset Your Password",
    html: resetPasswordTemplate(name, resetUrl),
  }

  // Send email and catch errors
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Password reset email sent:", info.response)
  } catch (err) {
    console.error("Error sending password reset email:", err)
  }
}

export const sendResetPasswordSuccessEmail = async (
  email: string,
  name: string
): Promise<void> => {
  // Setup nodemailer transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // My Email doing the sending
      pass: process.env.PASS, // App password from environment variable
    }
  })

  // Mail options
  const mailOptions = {
    from: `"Ogivva" <${process.env.EMAIL}>`,
    to: email,
    subject: "Password Reset Successful",
    html: resetPasswordSuccessEmailTemplate(name),
  }

  // Send email and catch errors
  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Password reset success email sent:", info.response)
  } catch (err) {
    console.error("Error sending password reset success email:", err)
  }
}
