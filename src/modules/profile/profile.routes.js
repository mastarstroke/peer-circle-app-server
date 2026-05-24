const router = require("express").Router();

const profileController = require(
  "./profile.controller"
);

const isAuthenticated = require(
  "../../middleware/auth.middleware"
);

router.get(
  "/me",
  isAuthenticated,
  profileController.getProfile
);

router.put(
  "/update",
  isAuthenticated,
  profileController.updateProfile
);

module.exports = router;