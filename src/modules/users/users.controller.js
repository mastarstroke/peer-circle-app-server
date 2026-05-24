const usersService = require("./users.service");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await usersService.getAllUsers(req.user.id);

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getFollowing = async (req, res) => {
  try {
    const following = await usersService.getFollowingUsers(req.user.id);

    res.json(following);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};