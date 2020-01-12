const { Pool } = require('pg');
require('dotenv').config();

// PG database client/connection setup
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
// db.connect();

module.exports = db;
