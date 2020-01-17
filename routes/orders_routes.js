const express = require('express');

const router = express.Router();
const app = express();

module.exports = (ordersService, db) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", async (req, res) => {
    const orderData = req.body;
    await ordersService.postOrders();
    await ordersService.postOrderItems(orderData);
    res.json({});
  });

  router.get("/checkout", async (req, res) => {
    const orders = await ordersService.getOrder()
    const templateVars = { orders };
    console.log("RETURNED ORDER DATA 123->", orders)
    res.render('checkout', templateVars);
  });

  return router;
};
