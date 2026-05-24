const router = require("express").Router();

const relationshipController = require(
  "./relationships.controllers"
);

const isAuthenticated = require(
  "../../middleware/auth.middleware"
);

router.post(
  "/follow",
  isAuthenticated,
  relationshipController.followUser
);

router.post(
  "/unfollow",
  isAuthenticated,
  relationshipController.unfollowUser
);

router.get(
  "/following",
  isAuthenticated,
  relationshipController.getFollowing
);

module.exports = router;