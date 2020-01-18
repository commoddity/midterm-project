const aws = require('aws-sdk');

// const twilioParams = require('../lib/twilioParams');

let twilioParams = new aws.S3({
  authToken: process.env.TWILIO_AUTH_TOKEN,
  accountSid: process.env.TWILIO_ACCOUNTSID,
  number: process.env.TWILIO_NUMBER
});

const sendMessage = (messageBody, userPhoneNumber) => {
  console.log(twilioParams.accountSid)
  const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
  return twilioClient.messages.create({
    body: `${messageBody}`,
    from: twilioParams.number,
    to: `${userPhoneNumber}`
  })
  .then((message) => message)
  .catch(e => console.error(e))
  };

  module.exports = { sendMessage };
