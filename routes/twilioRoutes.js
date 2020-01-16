const express = require('express');

const router = express.Router();

module.exports = (twilioService) => {

  router.get("/", (req, res) => {
    res.render("index");
  })

  router.post("/send", (req, res) => {
    // const orderData = req.body;
    const messageBody = `some string`;
    twilioService.sendMessage(messageBody);
  })

  return router
};
