const express = require('express');

const router = express.Router();

module.exports = (menuItemsService, restaurantsService) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/menu", async (req, res) => {
    try {
      queryData = {};
      const menuItems = await menuItemsService.getMenuItems();
      const restaurants = await restaurantsService.getRestaurants(1);
      queryData = { menuItems, restaurants }
    } catch(err) {
      console.error(err);
    }
    res.json({queryData});
  });

  return router;
};
