// password reset code service
const twilio = require("twilio");
const twilioConfig = require("../Config/twilio");
const twilioClient = twilio(twilioConfig.accountSid, twilioConfig.authToken);

module.exports = {
  sendSms: async (to, message) => {
    try {
      await twilioClient.messages.create({
        body: message,
        to: to,
        from: twilioConfig.phoneNumber,
      });
      return true;
    } catch (twilioError) {
      console.error("Twilio Error:", twilioError);
      return false;
    }
  },
};
