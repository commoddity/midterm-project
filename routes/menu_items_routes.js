const express = require("express");

const router = express.Router();

module.exports = (menuItemsService, restaurantsService) => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/menu", async (req, res) => {
    try {
      const [menuItems, restaurants] = await Promise.all([
        await menuItemsService.getMenuItems(),
        await restaurantsService.getRestaurants(1)
      ]);
      res.send({ menuItems, restaurants });
    } catch (err) {
      console.error(err);
    }
  });
  return router;
};
