module.exports = (ordersRepository) => {
  return {
    getOrders: () => {
      return ordersRepository.getOrders()
    }
  }
};
