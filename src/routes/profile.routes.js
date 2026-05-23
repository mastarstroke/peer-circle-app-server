const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/profile.controller");

const isAuthenticated = require("../middleware/auth.middleware");

router.get("/me", isAuthenticated, getProfile);
router.put("/update", isAuthenticated, updateProfile);

module.exports = router;