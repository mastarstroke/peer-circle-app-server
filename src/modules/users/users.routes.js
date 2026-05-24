const router = require("express").Router();

const isAuthenticated = require("../../middleware/auth.middleware");

const {
  getAllUsers,
  getFollowing,
} = require("./users.controller");

router.get("/", isAuthenticated, getAllUsers);

router.get("/following", isAuthenticated, getFollowing);

module.exports = router;