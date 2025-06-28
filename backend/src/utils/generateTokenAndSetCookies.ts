// This file contains the function to generate a JWT token and set it as a cookie in the response.

import jwt from "jsonwebtoken";
import { Response } from "express";

// Function to generate a JWT token and set it as a cookie in the response
export const generateTokenAndSetCookie = (
  userId: string,
  res: Response,
  maxAge?: number
): string => {
  // Generate JWT token with user ID and secret key
  const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    ...(maxAge ? { maxAge } : {}), 
  });

  return token;
};
