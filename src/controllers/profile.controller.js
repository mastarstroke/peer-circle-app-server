const prisma = require("../config/prisma");

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      fullName,
      headline,
      bio,
      company,
      location,
      skills,
      website,
      github,
      linkedin,
    } = req.body;

    const updatedUser = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        fullName,
        headline,
        bio,
        company,
        location,
        skills,
        website,
        github,
        linkedin,
      },
    });

    res.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};