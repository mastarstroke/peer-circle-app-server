const logsService = require("./logs.service");

exports.getMyLogs = async (req, res) => {
  try {
    const logs = await logsService.getUserLogs(req.user.id);

    res.json(logs);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};