const prisma = require("../config/prisma");

// exports.getAllUsers = async (req, res) => {
//   try {
//     const users = await prisma.user.findMany({
//       select: {
//         id: true,
//         fullName: true,
//         avatar: true,
//         headline: true,
//       },
//     });

//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: req.user.id,
        },
      },

      select: {
        id: true,
        fullName: true,
        avatar: true,
        headline: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}; 
exports.getFollowing = async (req, res) => {
  try {
    const userId = req.user.id;

  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: true,
    },
  });

    res.json(following.map(f => f.following));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};