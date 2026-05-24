const profileService = require("./profile.service");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user =
      await profileService.getProfile(
        req.user.id
      );

    res.json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const updatedUser =
      await profileService.updateProfile(
        req.user.id,
        req.body
      );

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};