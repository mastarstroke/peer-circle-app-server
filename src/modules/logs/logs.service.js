const logsRepository = require("./logs.repository");

exports.logActivity = async ({
  userId,
  action,
  details,
}) => {
  return logsRepository.createLog({
    userId,
    action,
    details,
  });
};

exports.getUserLogs = async (userId) => {
  return logsRepository.findUserLogs(userId);
};