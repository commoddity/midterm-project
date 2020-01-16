// function sendMessage(messageData) {
//   return client.messages.create({
//     body: `Hi ${messageData.body.userName},
//     Thanks for ordering with LightResto.
//     Your food is ready for pickup`,
//     from: fromPhone,
//     to: `${messageData.body.sendText}`
//   })
// }

module.exports = (twilioParams) => {
  return {
    sendMessage: (messageBody, userPhoneNumber) => {
      const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
      return twilioClient.messages.create({
        body: `Your order has been received.`,
        from: twilioParams.fromPhone,
        to: `${userPhoneNumber}`
      })
      .then((message) => console.log(message.sid, {userPhoneNumber}))
      .catch(e => console.error(e))
    }
  };
};
