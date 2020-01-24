// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const HOST = "0.0.0.0";
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const morgan = require("morgan");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
app.use(morgan("dev"));

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect();

//EJS view engine setup
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//Serve static files (images, CSS, JS files)
app.use(express.static("public"));

// Separated Routes for each Resource
const menuRoutes = require("../routes/menu_items_routes");
const orderRoutes = require("../routes/orders_routes");

//Menu Items Layers
const menuItemsRepositoryFactory = require("../repository/menu_items_repository");
const menuItemsServiceFactory = require("../service/menu_items_service");

const menuItemsRepository = menuItemsRepositoryFactory(db);
const menuItemsService = menuItemsServiceFactory(menuItemsRepository);

//Orders Layers
const ordersRepositoryFactory = require("../repository/orders_repository");
const ordersServiceFactory = require("../service/orders_service");

const ordersRepository = ordersRepositoryFactory(db);
const ordersService = ordersServiceFactory(ordersRepository);

//Restaurants Layers
const restaurantsRepositoryFactory = require("../repository/restaurants_repository");
const restaurantsServiceFactory = require("../service/restaurants_service");

const restaurantsRepository = restaurantsRepositoryFactory(db);
const restaurantsService = restaurantsServiceFactory(restaurantsRepository);

//Order Placed Layer
const orderPlacedServiceFactory = require("../service/order_placed_service");

const orderPlacedService = orderPlacedServiceFactory(ordersService, db);

// Mount all resource routes
app.use("/", menuRoutes(menuItemsService, restaurantsService));
app.use("/", orderRoutes(ordersService, orderPlacedService));

// Home page
app.listen(PORT, HOST, () => {
  console.log(
    `Example app listening on port ${PORT}\nWelcome to Buns on Broadway!`
  );
});
