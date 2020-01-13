const db = require('../../server/index.js')

//Helper Functions

//Database Queries
const getMenuImageFromDatabase = (menuItem) => {
  const queryString = `
  SELECT name, price, image_url
  FROM menu_items
  WHERE id = $1;
  `
  id = [menuItem];
  return db.query(queryString, id)
  .then((res) => res.rows[0])
  .catch((err) => {
    console.error('query error', err.stack);
  });
};

getMenuImageFromDatabase(1);

module.exports = getMenuImageFromDatabase;
