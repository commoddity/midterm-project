module.exports = (ordersRepository) => {
  return {
    postOrders: (orders) => {
      return ordersRepository.postOrders(orders)
    }
  }
};
