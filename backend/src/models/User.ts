import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types/user";

export interface IUser extends Document {
  name: string ;
  email: string ;
  password: string ;
  role?: UserRole ;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
  isVerified: boolean;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser> (
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    }, 
    password: {
      type: String,
      required: true,
    }, 
    role: {
      type: String,
      enum: [
        "gifter", 
        "reciever", 
        "vendor"
      ],
      default: "reciever",
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationTokenExpiresAt: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    }
  },
  { timestamps: true }
)

const User = mongoose.model<IUser>("User", userSchema);
export default User;