import mongoose, { Schema, Document, Types } from "mongoose"

export interface IProduct extends Document {
  vendorId: Types.ObjectId;
  title: string;
  description?: string;
  price: number;
  images: string[];
  categories: string[];
  stockQuantity: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct> (
  {
    vendorId: { 
      type: Schema.Types.ObjectId, 
      ref: "Vendor", 
      required: true 
    },
    title: {
      type: String, 
      required: true 
    },
    description: { 
      type: String 
    },
    price: { 
      type: Number, 
      required: true 
    },
    images: [
      { 
        type: String 
      }
    ],
    categories: [
      { 
        type: String 
      }
    ],
    stockQuantity: { 
      type: Number, 
      default: 0 
    },
    isActive: { 
      type: Boolean, 
      default: true 
    }
  }, 
  {timestamps: true}
)

const Product = mongoose.model<IProduct>("Product", ProductSchema)
export default Product;