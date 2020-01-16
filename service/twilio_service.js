module.exports = (twilioRepository) => {
  return {
    sendMessage: (messageBody) => {
      return twilioRepository.sendMessage(messageBody)
    }
  }
};