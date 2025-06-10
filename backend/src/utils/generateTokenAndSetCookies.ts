// This file contains the function to generate a JWT token and set it as a cookie in the response.

import jwt from "jsonwebtoken";
import { Response } from "express";
// import dotenv from "dotenv";
// dotenv.config();

// Function to generate a JWT token and set it as a cookie in the response
export const generateTokenAndSetCookie = (
  userId: string,
  res: Response
): string => {
  // Generate JWT token with user ID and secret key from environment variables
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  // Set the token as a cookie in the response with options
  // httpOnly: true - prevents client-side JavaScript from accessing the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return token;
};