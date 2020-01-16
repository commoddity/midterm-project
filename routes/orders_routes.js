const express = require('express');

const router = express.Router();

module.exports = (ordersService) => {

  // const asyncMiddleware = async (req, res, next) => {
  //   console.log("PREVTODATA", ordersService.getOrder());
  //   const order = await ordersService.getOrder()
  //   .then((res) => {
  //     console.log("DATAHERE", res);
  //     console.log("DATAJSON", res.json());
  //     return res.json()
  //   })
  //   .catch((e) => console.error(e));
  //   next();
  // };

  //ALSO TRIED USING ASYNC MIDDLEWARE AS SEEN HERE ^^

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.post("/checkout", (req, res) => {
    const orderData = req.body;
    ordersService.postOrders();
    ordersService.postOrderItems(orderData);
  });


  //DATA STILL RETURNS UNDEFINED FOR SOME REASON?
  router.get("/checkout", async (req, res) => {
    const data = await ordersService.getOrder()
          .then((data) => data)
          .catch(e => console.error(e));
          console.log("DATA", data);
    return app.render(req, res, "/checkout", { data });
  })

  // router.get(, asyncMiddleware, (req, res) => {
  //   console.log("REQ->", req.body)
  //   console.log("RES->", res.body)
  //   res.render("checkout");
  // });

  //AND HERE (ASYNC)^^

  return router
};
