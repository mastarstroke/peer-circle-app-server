const router = require("express").Router();

const isAuthenticated = require("../../middleware/auth.middleware");

const {
  getMyLogs,
} = require("./logs.controller");

router.get("/me", isAuthenticated, getMyLogs);

module.exports = router;