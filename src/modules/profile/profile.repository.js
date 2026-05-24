const prisma = require("../../config/prisma");

exports.findUserById = async (userId) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

exports.updateUserProfile = async (userId, data) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data,
  });
};