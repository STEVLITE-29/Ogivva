import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
dotenv.config()
import authRoutes from "./routes/auth"

const app = express();
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes)

// Environment 
const port : number = parseInt(process.env.Port || "2001");
const mongo_uri : string = process.env.Mongo_Uri as string;

// MongoDB connection 
const connectDB = async () => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection Failed:", error)
  }
}
connectDB();

// Start server 
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
})
