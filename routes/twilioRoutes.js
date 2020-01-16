const express = require('express');

const router = express.Router();

module.exports = (twilioService) => {

  // router.get("/", (req, res) => {
  //   res.render("index");
  // })

  router.post("/send", (req, res) => {
    const userPhoneNumber = req.body.phoneNumber;
    const messageBody = `some string`;
    twilioService.sendMessage(messageBody, userPhoneNumber).then(res.render("index"))
  })

  // router.post("/sendsms", (req, res) => {
  //   const data = req.body.phoneNumber;
    
  //   console.log(data);
  // })

  return router;
};
