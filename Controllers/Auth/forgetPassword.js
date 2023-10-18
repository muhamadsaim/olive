const validUser = require("../../Models/Auth/Signup");
const twilioConfig = require("../../Config/twilio");
const twilio = require("twilio")(
  twilioConfig.accountSid,
  twilioConfig.authToken
);
const twilioService = require("../../Services/smsService");
// const dotenv = require("dotenv");
// dotenv.config();

const forgetPassword = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone Number is required" });
    }

    const user = await validUser.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetCode = Math.floor(1000 + Math.random() * 9000);
    const phoneNumber = "+92" + phone.replace(/\D/g, "");

    const smsSent = await twilioService.sendSms(
      phoneNumber,
      `From OLIVE OIL: Your password reset code is: ${resetCode}`
    );

   
    if (smsSent) {
      user.resetCode = resetCode;
      await user.save();
      res.status(200).json({
        success: true,
        message: "Password reset code sent successfully",
      });
    } else {
      res
        .status(500)
        .json({ success: false, message: "Twilio error occurred" });
    }
  } catch (error) {
    console.error("Error in forgetPassword controller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = forgetPassword;
