import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWalletTransaction extends Document {
  userId: Types.ObjectId;
  type: "topup" | "purchase" | "refund";
  amount: number;
  currency: string;
  paymentMethodId?: Types.ObjectId;
  relatedGiftId?: Types.ObjectId;
  status: "pending" | "completed" | "failed";
  createdAt: Date;
}

const WalletTransactionSchema = new Schema<IWalletTransaction>(
  {
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    type: { 
      type: String, 
      enum: ["topup", "purchase", "refund"], 
      required: true 
    },
    amount: { 
      type: Number, 
      required: true 
    },
    currency: { 
      type: String, 
      default: "NGN" 
    },
    paymentMethodId: { 
      type: Schema.Types.ObjectId, 
      ref: "PaymentMethod" 
    },
    relatedGiftId: { 
      type: Schema.Types.ObjectId, 
      ref: "Gift" 
    },
    status: { 
      type: String, 
      enum: ["pending", "completed", "failed"], 
      default: "pending" 
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const WalletTransaction = mongoose.model<IWalletTransaction>("WalletTransaction", WalletTransactionSchema);
export default WalletTransaction;
