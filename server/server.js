// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const HOST       = '0.0.0.0';
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const app        = express();
const morgan     = require('morgan');
const session    = require('cookie-session');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const twilioParams = require('../lib/twilioParams');

const db = new Pool(dbParams);
db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const menuRoutes = require("../routes/menu_items_routes");
const orderRoutes = require("../routes/orders_routes");
// const twilioRoutes = require("../routes/twilioRoutes");

//Menu Items Layers
const menuItemsRepositoryFactory = require("../repository/menu_items_repository");
const menuItemsServiceFactory = require("../service/menu_items_service");

const menuItemsRepository = menuItemsRepositoryFactory(db)
const menuItemsService = menuItemsServiceFactory(menuItemsRepository)

//Orders Layers
const ordersRepositoryFactory = require("../repository/orders_repository");
const ordersServiceFactory = require("../service/orders_service");

const ordersRepository = ordersRepositoryFactory(db, twilioParams)
const ordersService = ordersServiceFactory(ordersRepository)

// Mount all resource routes
// Note: mount other resources here, using the same pattern above
app.use("/", menuRoutes(menuItemsService));
app.use("/", orderRoutes(ordersService));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}\nWelcome to Buns on Broadway!`);
});
