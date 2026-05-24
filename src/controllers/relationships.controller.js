const prisma = require("../config/prisma");

// FOLLOW USER
exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    if (followerId === userId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    const existing = await prisma.follow.findFirst({
      where: {
        followerId,
        followingId: userId,
      },
    });

    if (existing) {
      return res.status(400).json({
        message: "Already following this user",
      });
    }

    await prisma.follow.create({
      data: {
        followerId,
        followingId: userId,
      },
    });

    res.json({
      success: true,
      message: "User followed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// UNFOLLOW USER
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { userId } = req.body;

    await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId: userId,
      },
    });

    res.json({
      success: true,
      message: "User unfollowed",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// GET FOLLOWING LIST
exports.getFollowing = async (req, res) => {
  try {
    const userId = req.user.id;

    const following = await prisma.follow.findMany({
      where: { followerId: userId },
      include: {
        following: true,
      },
    });

    res.json(following.map((f) => f.following));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
