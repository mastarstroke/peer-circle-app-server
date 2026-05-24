const usersRepository = require("./users.repository");

exports.getAllUsers = async (currentUserId) => {
  return usersRepository.findAllUsers(currentUserId);
};

exports.getFollowingUsers = async (userId) => {
  const following = await usersRepository.findFollowingUsers(userId);

  return following.map((item) => item.following);
};