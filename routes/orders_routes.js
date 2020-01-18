const express = require('express');

const router = express.Router();

const { sendMessage } = require('../twilio/twilio_funcs.js');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

let object = {
  orderReady: ''
};

module.exports = (ordersService, orderPlacedService, db) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", async(req, res) => {
    const orderData = req.body;
    await ordersService.postOrders();
    await ordersService.postOrderItems(orderData);
    res.json({});
  });

  router.get("/checkout", async(req, res) => {
    const orders = await orderPlacedService.getOrder();
    const message = `New order received from ${orders[0].user_name}. Order ID: ${orders[0].order_id}. Order placed at: ${orders[0].time_placed}.`;
    if (!object.orderReady) {
      object.orderReady = 'is IN PROGRESS';
      sendMessage(message, 17788822481);
    }
    const templateVars = { orders, object };
    res.render('checkout', templateVars);
  });

  router.post('/sms', async(req, res) => {
    const orders = await orderPlacedService.getOrder();
    const orderTime = req.body.Body;
    object.orderReady = `should be ready for pickup in ${orderTime} minutes`;
    const twiml = new MessagingResponse();
    const message = twiml.message();
    const userMessage = `Your order has been received. You may pick up your order in ${orderTime} minutes.`;
    sendMessage(userMessage, `${orders[0].phone_number}`);
    message.body(`Confirmed. Order should be ready in ${orderTime} minutes.`);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

  return router;
};
