import mongoose, { Schema, Document, Types } from "mongoose";

export interface IMessage extends Document {
  senderId: Types.ObjectId;
  receiverId: Types.ObjectId;
  content: string;
  readAt?: Date;
  createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    receiverId: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    content: { 
      type: String, 
      required: true 
    },
    readAt: { 
      type: Date 
    }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;