module.exports = (ordersRepository) => {
  return {
    postOrders: (orders) => {
      return ordersRepository.postOrders(orders);
    },
    postOrderItems: (orders) => {
      return ordersRepository.postOrderItems(orders);
    },
    getOrder: (order) => {
      return ordersRepository.getOrder(order);
    }
  };
};
