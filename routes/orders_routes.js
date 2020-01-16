const express = require('express');

const router = express.Router();

module.exports = (ordersService) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    ordersService.postOrders();
    ordersService.postOrderItems(orderData);
  });

  router.get("/checkout", (req, res) => {
    res.render("checkout")
    return ordersService.getOrder()
  });

  return router
};
