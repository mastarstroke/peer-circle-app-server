const router = require("express").Router();

const { getAllUsers } = require("../controllers/users.controller");
const isAuthenticated = require("../middleware/auth.middleware");

router.get("/", isAuthenticated, getAllUsers);


module.exports = router;