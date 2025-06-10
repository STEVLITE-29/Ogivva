import express from "express"

// Routes for authentication operations
const router = express.Router();
import { 
  signup,
  login,
  logout,
  verifyEmail,
  // forgotPassword,
  // resetPassword,
  // checkAuth
 } from "../controllers/authController";

// Routes for authentication 
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
// router.get("/forgot-password", forgotPassword)
// router.get("/reset-password", resetPassword)

export default router;