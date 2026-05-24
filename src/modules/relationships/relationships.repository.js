const prisma = require("../../config/prisma");

exports.findFollow = async (followerId, followingId) => {
  return prisma.follow.findFirst({
    where: {
      followerId,
      followingId,
    },
  });
};

exports.createFollow = async (followerId, followingId) => {
  return prisma.follow.create({
    data: {
      followerId,
      followingId,
    },
  });
};

exports.deleteFollow = async (followerId, followingId) => {
  return prisma.follow.deleteMany({
    where: {
      followerId,
      followingId,
    },
  });
};

exports.getFollowingUsers = async (userId) => {
  return prisma.follow.findMany({
    where: {
      followerId: userId,
    },

    include: {
      following: true,
    },
  });
};