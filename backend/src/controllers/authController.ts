import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express"
import User from "../models/User";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies"
import { sendVerificationEmail } from "../email/sendEmails";

//signup controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // destructure all needed field from request body 
    let { name, email, password } = req.body
    // to make sure all needed info are filled and turn email to lowercase
    if (!name || !email || !password) {
      res.status(400).json({message: "All fields are required"});
      return;
    }
    email = email.trim().toLowerCase()
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409).json({message: "User already exists."});
      return;
    }
    // hash password for security
    const hashedPassword = await bcryptjs.hash(password, 10)

    // generate secure email verification token (four-digit token)
    const verificationToken = crypto.randomInt(1000, 10000).toString();

    // create user
    const user = new User ({
      name, 
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // attempt to send email before saving user
    await sendVerificationEmail(user.email, verificationToken);
    await user.save()

    // generate JWT and set cookie
    generateTokenAndSetCookie(user._id as string, res);

    res.status(201).json({success: true, message: "User created, Please check your email to verify your account"})
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({message: "Failed to signup"});
  }
};

