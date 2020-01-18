module.exports = (ordersRepository) => {
  return {
    getLatestOrderId: (orders) => {
      return ordersRepository.getLatestOrderId(orders);
    },
    postOrders: (orders) => {
      return ordersRepository.postOrders(orders);
    },
    postOrderItems: (orders) => {
      return ordersRepository.postOrderItems(orders);
    }
  };
};
