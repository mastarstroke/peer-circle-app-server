const prisma = require("../../config/prisma");

exports.findAllUsers = async (currentUserId) => {
  return prisma.user.findMany({
    where: {
      NOT: {
        id: currentUserId,
      },
    },

    select: {
      id: true,
      fullName: true,
      avatar: true,
      headline: true,
    },
  });
};

exports.findFollowingUsers = async (userId) => {
  return prisma.follow.findMany({
    where: {
      followerId: userId,
    },

    include: {
      following: true,
    },
  });
};