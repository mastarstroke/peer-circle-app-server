const relationshipRepository = require("./relationships.repository");
const logsService = require("../logs/logs.service");
const usersRepository = require("../users/users.repository");

exports.followUser = async (followerId, followingId) => {
  const targetUser = await usersRepository.findUserById(
    followingId
  );

  if (followerId === followingId) {
    throw new Error("You cannot follow yourself");
  }

  const existingFollow =
    await relationshipRepository.findFollow(
      followerId,
      followingId
    );

  if (existingFollow) {
    throw new Error("Already following this user");
  }

  await relationshipRepository.createFollow(
    followerId,
    followingId
  );

  await logsService.logActivity({
    userId: followerId,
    action: "FOLLOWED_USER",
    details: `Started following user ${targetUser.fullName}`,
  });

  return {
    success: true,
    message: "User followed successfully",
  };
};

exports.unfollowUser = async (followerId, followingId) => {

  const targetUser = await usersRepository.findUserById(
    followingId
  );

  await relationshipRepository.deleteFollow(
    followerId,
    followingId
  );

  await logsService.logActivity({
    userId: followerId,
    action: "UNFOLLOWED_USER",
    details: `Stopped following ${targetUser.fullName}`,
  });

  return {
    success: true,
    message: "User unfollowed successfully",
  };
};

exports.getFollowingUsers = async (userId) => {
  const following =
    await relationshipRepository.getFollowingUsers(
      userId
    );

  return following.map((item) => item.following);
};