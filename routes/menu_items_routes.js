// ONLY DEALS WITH ROUTES --> OTHERWISE KNOWN AS CONTOLLERS
// HAS DEPENDENCY WITH SERVICE PARAMETERS ONLY
const express = require('express');

const router = express.Router();

module.exports = (menuItemsService) => {

  router.get("/", (req, res) => {
    res.render("index");
  });

  router.get("/menu", (req, res) => {
    menuItemsService.getMenuItems()
    .then(result => {
      const data = result;
      res.json({data});
    })
    .catch(e => console.error(e))
  });

  return router
};
