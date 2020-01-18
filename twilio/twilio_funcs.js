const twilioParams = require('../lib/twilioParams');

const sendMessage = (messageBody, userPhoneNumber) => {
  const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
  return twilioClient.messages.create({
    body: `${messageBody}`,
    from: twilioParams.fromPhone,
    to: `${userPhoneNumber}`
  })
  .then((message) => message)
  .catch(e => console.error(e))
  };

  module.exports = { sendMessage };
