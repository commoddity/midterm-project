// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const HOST       = '0.0.0.0';
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const twilioParams = require('../lib/twilioParams');

// const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
// twilioClient.messages.create({
//   to: `+17788822481`,
//   from: twilioParams.fromPhone,
//   body: `I am sending you from the servre`
// }).then((message) => console.log(message)).catch(e => console.error(e))

const db = new Pool(dbParams);
db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(express.static("public"));


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("../routes/users");
const widgetsRoutes = require("../routes/widgets");
const menuRoutes = require("../routes/menu_items_routes");
const orderRoutes = require("../routes/orders_routes");
const twilioRoutes = require("../routes/twilioRoutes");

//Menu Items Layers
const menuItemsRepositoryFactory = require("../repository/menu_items_repository");
const menuItemsServiceFactory = require("../service/menu_items_service");

const menuItemsRepository = menuItemsRepositoryFactory(db)
const menuItemsService = menuItemsServiceFactory(menuItemsRepository)

//Orders Layers
const ordersRepositoryFactory = require("../repository/orders_repository");
const ordersServiceFactory = require("../service/orders_service");

const ordersRepository = ordersRepositoryFactory(db)
const ordersService = ordersServiceFactory(ordersRepository)

//Twilio Layers
const twilioRepositoryFactory = require("../repository/twilio_repository");
const twilioServiceFactory = require("../service/twilio_service");

const twilioRepository = twilioRepositoryFactory(twilioParams);
const twilioService = twilioServiceFactory(twilioRepository);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// Note: mount other resources here, using the same pattern above
app.use("/", menuRoutes(menuItemsService));
app.use("/", orderRoutes(ordersService));
app.use("/", twilioRoutes(twilioService));

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
// app.get("/", (req, res) => {
//   res.render("index");
// });
//app.get("/menuitems", (req,res) =>{res.send('Welcome!')})
app.listen(PORT, HOST, () => {
  console.log(`Example app listening on port ${PORT}\nWelcome to Buns on Broadway!`);
});
