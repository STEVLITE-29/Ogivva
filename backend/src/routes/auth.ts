import express from "express"

// Routes for authentication operations
const router = express.Router();
import { 
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  checkAuth
 } from "../controllers/authController";
 import { protectAuth } from "../middlewares/protectAuth"
 
router.get("/check-auth", protectAuth, checkAuth);
// Routes for authentication 
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword);

export default router;