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
    console.log("REQ ->", req.body)
    console.log("RES ->", res.body)
    return ordersService.getOrder()
    .then((res) => {
      console.log("GET RESPONSE", res)
      res.render("checkout")
    })
    .catch(e => console.error(e));
  });

  return router
};
