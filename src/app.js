const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

require("./config/passport");

const authRoutes = require("./modules/auth/auth.routes");

const app = express();

const relationshipRoutes = require(
  "./modules/relationships/relationships.routes"
);

const profileRoutes = require(
  "./modules/profile/profile.routes"
);

const usersRoutes = require(
  "./modules/users/users.routes"
);

// 1. CORS FIRST
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// 2. BODY PARSING
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. COOKIE PARSER
app.use(cookieParser());

// 4. SESSION 
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// 5. PASSPORT
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/users", usersRoutes);

app.use("/api/relationships", relationshipRoutes);
app.use("/api/profile", profileRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

module.exports = app;