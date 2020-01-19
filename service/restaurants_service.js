module.exports = (restaurantsRepository) => {
  return {
    getRestaurants: (restaurantId) => {
      return restaurantsRepository.getRestaurants(restaurantId);
    }
  };
};
