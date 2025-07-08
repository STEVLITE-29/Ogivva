import mongoose, { Schema, Document, Types } from "mongoose"

export interface IGift extends Document {
  gifterId: Types.ObjectId;
  receiverId: Types.ObjectId;
  momentId?: Types.ObjectId;
  productId: Types.ObjectId;
  quantity: number;
  message?: string;
  isAnonymous: boolean;
  status: "pending" | "sent" | "claimed" | "cancelled" | "expired";
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state?: string;
    zip: string;
    country: string;
    phone?: string;
  };
  createdAt: Date;
}

const GiftSchema = new Schema<IGift>(
  {
    gifterId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    receiverId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    momentId: { 
      type: Schema.Types.ObjectId, 
      ref: "Moment" 
    },
    productId: { 
      type: Schema.Types.ObjectId, 
      ref: "Product", 
      required: true 
    },
    quantity: { 
      type: Number, 
      default: 1 
    },
    message: { 
      type: String 
    },
    isAnonymous: { 
      type: Boolean, 
      default: false 
    },
    status: {
      type: String,
      enum: ["pending", "sent", "claimed", "cancelled", "expired"],
      default: "pending"
    },
    shippingAddress: {
      name: { 
        type: String, 
        required: true 
      },
      street: { 
        type: String, 
        required: true 
      },
      city: { 
        type: String, 
        required: true 
      },
      state: { 
        type: String 
      },
      zip: { 
        type: String, 
        required: true 
      },
      country: { 
        type: String, 
        required: true 
      },
      phone: { 
        type: String 
      }
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Gift = mongoose.model<IGift>("Gift", GiftSchema);
export default Gift; 

