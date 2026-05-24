const router = require("express").Router();

const {
  followUser,
  unfollowUser,
  getFollowing,
} = require("../controllers/relationships.controller");

const isAuthenticated = require("../middleware/auth.middleware");

router.post("/follow", isAuthenticated, followUser);
router.post("/unfollow", isAuthenticated, unfollowUser);
router.get("/following", isAuthenticated, getFollowing);

module.exports = router;