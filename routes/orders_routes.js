const express = require('express');

const router = express.Router();

module.exports = (ordersService, db) => {

  // const asyncMiddleware = async (req, res, next) => {
  //   const order = await ordersService.getOrder()
  //   req.order = order;
  //   next();
  // };

  //ALSO TRIED USING ASYNC MIDDLEWARE AS SEEN HERE ^^

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    ordersService.postOrders();
    ordersService.postOrderItems(orderData)
  });

  // DATA STILL RETURNS UNDEFINED FOR SOME REASON?
  router.post("/order-placed", async (req, res) => {
    const order = await ordersService.getOrder()
    console.log("ORDER DATA ->", order)
    res.render("./order-placed");
  });

  // router.get(, asyncMiddleware, (req, res) => {
  //   console.log("REQ->", req.body)
  //   console.log("RES->", res.body)
  //   res.render("checkout");
  // });

  //AND HERE (ASYNC)^^

  return router
};
