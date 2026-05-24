const relationshipService = require("./relationships.service");

// FOLLOW
exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    const response =
      await relationshipService.followUser(
        followerId,
        userId
      );

    res.json(response);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// UNFOLLOW
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    const response =
      await relationshipService.unfollowUser(
        followerId,
        userId
      );

    res.json(response);
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// GET FOLLOWING
exports.getFollowing = async (req, res) => {
  try {
    const userId = req.user.id;

    const following =
      await relationshipService.getFollowingUsers(
        userId
      );

    res.json(following);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};