const relationshipRepository = require("./relationships.repository");

exports.followUser = async (followerId, followingId) => {
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

  return {
    success: true,
    message: "User followed successfully",
  };
};

exports.unfollowUser = async (followerId, followingId) => {
  await relationshipRepository.deleteFollow(
    followerId,
    followingId
  );

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