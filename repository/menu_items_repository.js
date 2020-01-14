// DEALS ONLY WITH DATABASE QUERIES
// HAS DEPENDENCY ONLY WITH DATABASE
module.exports = (db) => {
  return {
    getMenuItems: () => {
      const queryString = `
      SELECT id, name, price, image_url
      FROM menu_items
      `
      return db.query(queryString)
      .then((res) => res.rows)
      .catch((err) => {
        console.error('query error', err.stack);
      });
    }
  }
};
