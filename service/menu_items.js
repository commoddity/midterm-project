module.exports = (menuItemsRepository) => {
  return {
    getMenuItems: () => {
      return menuItemsRepository.getMenuItems()
    }
  }
};
