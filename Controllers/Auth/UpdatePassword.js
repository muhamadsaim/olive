const validUser = require("../../Models/Auth/Signup");
const bcrypt = require("bcrypt");

const UpdatePassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;
    if (!phone || !newPassword) {
      return res
        .status(400)
        .json({ message: "Phone and new password are required" });
    }

    const user = await validUser.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in UpdatePassword controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = UpdatePassword;
