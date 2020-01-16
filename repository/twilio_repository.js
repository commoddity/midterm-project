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
    sendMessage: (messageData) => {
      const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
      return twilioClient.messages.create({
        body: `Your order has been received.`,
        from: twilioParams.fromPhone,
        to: `+17789600255`
      })
      .then((message) => console.log(message.sid))
      .catch(e => console.error(e))
    }
  };
};
