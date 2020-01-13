const db = require('../../server/index.js');

//Helper Functions

//Database Queries
const getMenuItemsFromDatabase = () => {
  console.log("TEST");
  const queryString = `
  SELECT id, name, price, image_url
  FROM menu_items
  `
  return db.query(queryString)
  .then((res) => res.rows)
  .catch((err) => {
    console.error('query error', err.stack);
  });
};

exports.getMenuItemsFromDatabase = getMenuItemsFromDatabase;
