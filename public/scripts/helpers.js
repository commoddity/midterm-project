const db = require('../../server/server.js')

//Helper Functions

//Database Queries
const getMenuImageFromDatabase = (menuItem) => {
  const queryString = `
  SELECT image_url
  FROM menu_items
  WHERE id = $1;
  `
  id = [menuItem];
  return db.query(queryString, id)
  .then((res) => {
    return res.rows[0].image_url;
  })
  .catch((err) => {
    console.error('query error', err.stack);
  });
};

module.exports = getMenuImageFromDatabase;
