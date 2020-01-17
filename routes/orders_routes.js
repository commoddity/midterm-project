const express = require('express');

const router = express.Router();

const MessagingResponse = require('twilio').twiml.MessagingResponse;

let inMemoryDb = {
  orderReady: 0
};

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
    const message = `New order received from ${orders[0].user_name}. Order ID: ${orders[0].order_id}. Order placed at: ${orders[0].time_placed}.`
    ordersService.sendMessage(message, 17788822481);
    res.render('checkout', templateVars);
  });

  router.post('/sms', async (req, res) => {
    const orders = await ordersService.getOrder();
    const orderTime = req.body.Body;
    // const templateVars = { orders, orderTime};
    const twiml = new MessagingResponse();
    const message = twiml.message();
    const userMessage = `Your order has been received. You may pick up your order in ${orderTime} minutes.`
    ordersService.sendMessage(userMessage, `${orders[0].phone_number}`);
    message.body(`Confirmed. Order should be ready in ${orderTime} minutes.`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  return router;
};
