// ONLY DEALS WITH ROUTES --> OTHERWISE KNOWN AS CONTOLLERS
// HAS DEPENDENCY WITH SERVICE PARAMETERS ONLY
const express = require('express');

const router = express.Router();

module.exports = (menuItemsService) => {

  router.get("/", (req, res) => {
    const templatevars = {userObj:``}
    res.render("index", templatevars);
  })

  router.get("/menu", (req, res) => {
    menuItemsService.getMenuItems()
    .then(result => {
      const data = result;
      res.json({data});
    })
    .catch(e => console.error(e))
  })

  router.get("/:id", (req, res) => {
    const userId = req.params.id;
    // console.log(userId)
    menuItemsService.getUser(userId)
    .then((data) => {
      const templatevars = {userObj: data} 
      console.log(templatevars);
      res.render("index", templatevars);
    })
  })

  return router
};
