import express from "express"
import passport from "passport";

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
router.post("/signin", login)
router.post("/logout", logout)
router.post("/verify-email", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password/:token", resetPassword);

router.get("/google", (req, res, next) => {
  req.session.role = req.query.role as string;
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/signin",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

router.get("/facebook", (req, res, next) => {
  req.session.role = req.query.role as string;
  passport.authenticate("facebook", {
    scope: ["email"],
  })(req, res, next);
});

router.get("/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/signin",
    session: true,
  }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  }
);

export default router;