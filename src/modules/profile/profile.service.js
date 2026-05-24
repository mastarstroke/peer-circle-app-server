const profileRepository = require("./profile.repository");
const logsService = require("../logs/logs.service");

exports.getProfile = async (userId) => {
  const user =
    await profileRepository.findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

exports.updateProfile = async (userId, payload) => {
  const updatedUser =
    await profileRepository.updateUserProfile(
      userId,
      {
        fullName: payload.fullName,
        headline: payload.headline,
        bio: payload.bio,
        company: payload.company,
        location: payload.location,
        skills: payload.skills,
        website: payload.website,
        github: payload.github,
        linkedin: payload.linkedin,
      }
    );

    await logsService.logActivity({
      userId,
      action: "Updated profile",
      details: `User updated their profile with new details: ${JSON.stringify(payload)}`,
    });
    
  return updatedUser;
};