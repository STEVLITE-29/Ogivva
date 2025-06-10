import express from "express"

// Routes for authentication operations
const router = express.Router();
import { 
  signup,
  // login,
  // logout,
  verifyEmail,
  // forgotPassword,
  // resetPassword,
  // checkAuth
 } from "../controllers/authController";

// Routes for authentication 
router.post("/signup", signup)
// router.get("/login", login)
// router.get("/logout", logout)
router.post("/verify-email", verifyEmail)
// router.get("/forgot-password", forgotPassword)
// router.get("/reset-password", resetPassword)

export default router;