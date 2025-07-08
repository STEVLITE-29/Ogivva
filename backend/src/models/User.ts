import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  name: string ;
  email: string ;
  password: string ;
  addresses: {
    label: string;
    name: string; 
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }[];
  role?: "gifter" | "receiver" | "vendor";
  profileImage?: string;
  walletBalance: number;
  paymentMethods: Types.ObjectId[];
  settings: {
    defaultAnonymous: boolean;
  };
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
    addresses: [
      {
        label: { type: String },
        name: { type: String },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String },
        zip: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String },
        isDefault: { type: Boolean, default: false }
      }
    ],
    role: {
      type: String,
      enum: [
        "gifter", 
        "reciever", 
        "vendor"
      ],
      required: true,
    },
    profileImage: { 
      type: String 
    },
    walletBalance: { 
      type: Number,
       default: 0 
    },
    paymentMethods: [
      { 
        type: Schema.Types.ObjectId, 
        ref: "PaymentMethod" 
      }
    ],
    settings: {
      defaultAnonymous: { 
        type: Boolean, 
        default: false 
      }
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