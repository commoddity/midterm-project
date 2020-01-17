// DEALS ONLY WITH DATABASE QUERIES
// HAS DEPENDENCY ONLY WITH DATABASE
module.exports = (db) => {
  return {
    getMenuItems: () => {
      const queryString = `
      SELECT id, name, blurb, price, image_url
      FROM menu_items
      `
      return db.query(queryString)
      .then((res) => res.rows)
      .catch((err) => {
        console.error('query error', err.stack);
      });
    },

    getUser: (userId) => {
      const queryString = `
      SELECT name, email, phone_number
      FROM users WHERE id = ${userId}
      `
      return db.query(queryString)
      .then((res) => res.rows[0])
      .catch(e => console.error(e))
    }
  }
};
