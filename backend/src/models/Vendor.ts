// models/Vendor.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IVendor extends Document {
  userId: Types.ObjectId;
  storeName: string;
  storeDescription?: string;
  storeLogo?: string;
  createdAt: Date;
}

const VendorSchema = new Schema<IVendor>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    storeName: { type: String, required: true },
    storeDescription: { type: String },
    storeLogo: { type: String }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Vendor = mongoose.model<IVendor>("Vendor", VendorSchema);
export default Vendor
