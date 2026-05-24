const prisma = require("../../config/prisma");

exports.createLog = async ({
  userId,
  action,
  details,
}) => {
  return prisma.activityLog.create({
    data: {
      userId,
      action,
      details,
    },
  });
};


exports.findUserLogs = async (userId) => {
  return prisma.activityLog.findMany({
    where: {
      userId,
    },

    orderBy: {
      createdAt: "desc",
    },

    take: 20,
  });
};