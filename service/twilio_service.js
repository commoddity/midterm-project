module.exports = (twilioRepository) => {
  return {
    sendMessage: (messageBody, userPhoneNumber) => {
      return twilioRepository.sendMessage(messageBody, userPhoneNumber)
    }
  }
};