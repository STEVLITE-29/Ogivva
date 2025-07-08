import mongoose, { Schema, Document, Types } from "mongoose"

export interface IMoment extends Document {
  userId: Types.ObjectId;
  title: string;
  date: Date;
  description?: string;
  wishlist: {
    productId: Types.ObjectId;
    priority: number;
    note?: string;
  }[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
} 

const MomentSchema = new Schema<IMoment> (
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    title: { 
      type: String, 
      required: true 
    },
    date: { 
      type: Date, 
      required: true 
    },
    description: { 
      type: String 
    },
    wishlist: [
      {
        productId: { 
          type: Schema.Types.ObjectId, 
          ref: "Product", 
          required: true 
        },
        priority: { 
          type: Number, 
          default: 1 
        },
        note: { 
          type: String 
        }
      }
    ],
    isPublic: { 
      type: Boolean, 
      default: true 
    }
  },
  { timestamps: true }
);

const Moment = mongoose.model<IMoment>("Moment", MomentSchema)
export default Moment;