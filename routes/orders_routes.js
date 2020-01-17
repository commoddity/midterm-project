const express = require('express');

const router = express.Router();

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
    const orders = await ordersService.getOrder();
    const templateVars = { orders };
    const message = `New order received from ${orders[0].user_name}. Order ID: ${orders[0].order_id}. Order placed at: ${orders[0].time_placed}.`
    ordersService.sendMessage(message, 17788822481);
    res.render('checkout', templateVars);
  });

  router.post("/sms", (req, res) => {
    const twiml = ordersService.receiveMessage();
    twiml.message('Your order will be ready in 15 minutes.');
    res.writeHead(200, {'Content-type': 'text/xml'});
    res.end(twiml.toString());
  });

  return router;
};
