import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./utils/pasport"
import authRoutes from "./routes/auth"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(
  session({
    secret: process.env.JWT_SECRET || "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes)

// Environment 
const port : number = parseInt(process.env.Port || "2001");
const mongo_uri : string = process.env.Mongo_URI as string;

// MongoDB connection 
const connectDB = async () => {
    try {
        await mongoose.connect(mongo_uri, {dbName: "Auth"})
        console.log("connected to database")
    } catch (error) {
        console.error("Failed to connect to database")
    }
}
connectDB();

// Start server 
app.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
})
