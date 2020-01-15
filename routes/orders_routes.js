const express = require('express');

const router = express.Router();

module.exports = (ordersService) => {

  router.get("/", (req, res) => {
    res.render("index");
  })

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    ordersService.postOrder()
    .then(res => {
      ordersService.postOrderItems(orderData);
    })
    .catch(e => console.error(e))
  })

  return router
};

// ordersService.postOrder IS NOT A FUNCTION ?!?!?! Y THO ?!
