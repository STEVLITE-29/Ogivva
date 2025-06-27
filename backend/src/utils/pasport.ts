import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user: any, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "http://localhost:2000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async (req: any, accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ email: profile.emails?.[0].value });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile.displayName,
          email: profile.emails?.[0].value,
          role: req.session.role, //role from session
          isVerified: true,
          password: "oauth-google", // optional placeholder
        });

        return done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "http://localhost:2000/api/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "displayName"],
      passReqToCallback: true,
    },
    async (req: any, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        const existingUser = await User.findOne({ email });

        if (existingUser) return done(null, existingUser);

        const newUser = await User.create({
          name: profile.displayName,
          email,
          role: req.session.role, //role from session
          isVerified: true,
          password: "oauth-facebook",
        });

        return done(null, newUser);
      } catch (err) {
        done(err);
      }
    }
  )
);
