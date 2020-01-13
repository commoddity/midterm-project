const express = require('express');
const router = express.Router();


module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render("index");
    res.redirect("/menu");
    res.redirect("/index")
  })

  router.get("/menu", (req, res) => {
    db.query(`SELECT * FROM menu_items`)
    .then(result => {
      const data = result.rows;
      res.json({data});
    })
    .catch(e => console.error(e))
  })

  return router
}