import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { Request, Response } from "express"
import User from "../models/User";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookies"
import { sendVerificationEmail, welcomeEmail, sendResetPasswordEmail, sendResetPasswordSuccessEmail } from "../email/sendEmails";

//signup controller
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // destructure all needed field from request body 
    let { name, email, password, role } = req.body
    // to make sure all needed info are filled and turn email to lowercase
    if (!name || !email || !password || !role) {
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
      role,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // attempt to send email before saving user
    await sendVerificationEmail(user.email, verificationToken);
    await user.save()

    // generate JWT and set cookie
    generateTokenAndSetCookie(user._id as string, res);

    res.status(201).json({
      success: true, 
      message: "User created, Please check your email to verify your account", 
      user: {
        ...user.toObject(),
        password: undefined, // Exclude password from response
      }, 
    })
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({message: "Failed to signup"});
  }
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  // destructure the verification token from the request body
  const { code } = req.body;
  try {
    // to check if the verification code is provided
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()} // if the code has expired
    })
    // check if token has expired or does not exist
    if (!user) {
      res.status(400).json({ success: "Failed", message: "Invalid or expired verification token" });
      return;
    }
    // updating user by setting is verified to true and clearing the verification token
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    // sending welcome email after sucessful verification
    await welcomeEmail(user.name as string, user.email as string)

    res.status(200).json({
      success: "Success", 
      message: "Email verified successfully",
      user: {
        ...user!.toObject(),
        password: undefined, // Exclude password from response
      }
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ message: "Email verification failed" });
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  // destructure email and password from request body 
  let { email, password } = req.body

  try {
    // make sure required fields are filled
    if (!email || !password) {
      res.status(400).json({message: "Input both email and password"});
      return; 
    }
    // turn email to lowercase and trim
    email = email.trim().toLowerCase()

    // find user by email
    const user = await User.findOne({ email })
    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    // check if user email is verified
    if (!user.isVerified) {
      res.status(409).json({message: "Email not verified, Please verify your email"});
      return;
    }

    // compare password with hashed password
    const isMatch = await bcryptjs.compare(password, user.password)
    if (!isMatch) {
      res.status(400).json({message: "Invalid password"});
      return;
    }

    //generate JWT and set cookies
    generateTokenAndSetCookie(user._id as string, res);

    // update last login time and save user
    user.lastLogin = new Date();
    await user.save()

    res.status(200).json({
      success: "Success",
      message: "Logged in successfully",
      user: {
        ...user.toObject(),
        password: undefined, // Exclude password from response
      }, 
    })
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login Failed" });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    // Clear the JWT cookie by setting it to null and expiring it
    res.clearCookie("token");

    // Respond with a success message
    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Logout failed" });
  }
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  // destructure email from request body
  const { email } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({message: "User not found"});
      return;
    }

    // generate a 4 digit reset password token 
    const resetToken = crypto.randomInt(1000, 10000).toString();
    // set token and expiration date 1hour 
    const resetTokenExpiresAt = Date.now() + 60 * 60 * 1000;

    // save token and expiration time in the user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = new Date(resetTokenExpiresAt);
    await user.save()

    // send password reset email
    sendResetPasswordEmail(user.email as string, user.name as string, `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`);

    res.status(200).json({
      success: "Success",
      message: "Reset password email sent sucessfully"
    })
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Failed to send password reset email" });
  }
}

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    // Destructure the request parameters and body
    const { token } = req.params
    const { password } = req.body

    // Validate input
    const user = await User.findOne({ 
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    })

    // Check if token exists and hasn't expired
    if(!user) {
      res.status(400).json({success: false, message: "Invalid request or Expired token"});
      return;
    }

    // update the user's password
    const hashedPassword = await bcryptjs.hash(password, 10)
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    // save 
    await user.save();  

    // send reset password success email
    await sendResetPasswordSuccessEmail(user.email, user.name);

    res.status(200).json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Failed to reset password" });
  }
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {  
  try {
    // Check if user is authenticated
    const user = await User.findById(req.userId).select("-password")
    
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({success: true, user})
  } catch (error) {
    console.error("Check auth error:", error);
    res.status(500).json({ success: false, message: "User is not authorized" });
  }
}