const twilioParams = {
  authToken: process.env.TWILIO_AUTH_TOKEN,
  accountSid: process.env.TWILIO_ACCOUNTSID,
  accountNumber: process.env.TWILIO_NUMBER
};

const sendMessage = (messageBody, userPhoneNumber) => {
  const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
  return twilioClient.messages.create({
    body: `${messageBody}`,
    from: twilioParams.accountNumber,
    to: `${userPhoneNumber}`
  })
    .then((message) => message)
    .catch(e => console.error(e));
};

module.exports = { sendMessage };
