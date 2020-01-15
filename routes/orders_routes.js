const express = require('express');

const router = express.Router();

module.exports = (ordersService) => {

  router.get("/", (req, res) => {
    res.render("index");
  })

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    // console.log(orderData);
    ordersService.postOrders(orderData)
  })

  return router
};

// ordersService.postOrder IS NOT A FUNCTION ?!?!?! Y THO ?!
