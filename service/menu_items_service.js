// DEALS ONLY WITH MENU_ITEMS REPOSITORY
// HAS DEPENDENCY WITH MENU_ITEMS REPOSITORY ONLY
module.exports = (menuItemsRepository) => {
  return {
    getMenuItems: () => {
      return menuItemsRepository.getMenuItems()
    },

    getUser: (userId) => {
      return menuItemsRepository.getUser(userId)
    }
  }
};
