const express = require('express');

const router = express.Router();

module.exports = (ordersService) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    ordersService.postOrders(orderData)
  });

  router.get("/checkout", (req, res) => {
    ordersService.getOrders()
    .then(() => {
      res.render("checkout")
    })
    .catch(e => console.error(e));
  })


  return router
};
