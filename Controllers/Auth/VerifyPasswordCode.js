const validUser = require("../../Models/Auth/Signup");

const Verify = async (req, res) => {
  try {
    const { phone, resetCode } = req.body;
    if (!phone || !resetCode) {
      return res
        .status(400)
        .json({ message: "Phone number and reset code are required" });
    }

    const user = await validUser.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetCode !== resetCode) {
      return res.status(401).json({ message: "Reset code does not match" });
    }

    user.resetCode = undefined;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password reset code matched" });
  } catch (error) {
    console.error("Error in Verify controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = Verify;
