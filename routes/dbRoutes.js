const express = require('express');

const router = express.Router();

module.exports = (db, helpers) => {

  router.get("/", (req, res) => {
    res.render("index");
    res.redirect("/menu");
    res.redirect("/index")
  })

  router.get("/menu", (req, res) => {
    helpers.getMenuItemsFromDatabase()
    .then(result => {
      const data = result;
      res.json({data});
    })
    .catch(e => console.error(e))
  })

  return router
};
