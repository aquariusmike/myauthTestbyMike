import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// ----------------------
// Middleware
// ----------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ----------------------
// Session
// ----------------------
app.use(session({
  secret: process.env.SESSION_SECRET || "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // for dev
}));

app.use(passport.initialize());
app.use(passport.session());

// ----------------------
// Passport Google Strategy
// ----------------------
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:4000/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // profile contains user's email
  done(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ----------------------
// Auth Routes
// ----------------------

// Login
app.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  (req, res) => {
    const email = req.user.emails[0].value;
    const domain = email.split("@")[1];

    const allowedDomains = ["stu.pathfinder-mm.org"];
    const allowedSingleEmail = "avagarimike11@gmail.com";

    const isVerified =
      allowedDomains.includes(domain) ||
      email === allowedSingleEmail;

    if (!isVerified) {
      req.logout(() => {
        req.session.destroy(() => {
          return res.redirect("http://localhost:5173/?error=not_verified");
        });
      });
      return;
    }

    // Verified student
    res.redirect("http://localhost:5173/dashboard");
  }
);



// Get current logged user
app.get("/auth/user", (req, res) => {
  res.json({ user: req.user || null });
});

// Logout
app.get("/auth/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy();
    res.clearCookie("connect.sid");
    res.sendStatus(200);
  });
});

// ----------------------
app.listen(4000, () => console.log("Server running on 4000"));
