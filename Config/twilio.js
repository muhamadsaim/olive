const dotenv = require('dotenv')
dotenv.config()

const twilioConfig = {
    accountSid: process.env.twilio_token_sid,
    authToken: process.env.twilio_auth_token,
    phoneNumber: process.env.twilio_phone,
};
  

module.exports=twilioConfig