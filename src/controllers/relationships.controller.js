const prisma = require("../config/prisma");

// FOLLOW USER
exports.followUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    if (!followingId) {
      return res.status(400).json({ message: "followingId is required" });
    }

    if (followerId === followingId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await prisma.follow.create({
      data: {
        followerId,
        followingId,
      },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UNFOLLOW USER
exports.unfollowUser = async (req, res) => {
  try {
    const followerId = req.user.id;
    const { followingId } = req.body;

    await prisma.follow.deleteMany({
      where: {
        followerId,
        followingId,
      },
    });

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
