module.exports = (ordersRepository) => {
  return {
    postOrders: () => {
      return ordersRepository.postOrders()
    }
  }
};
