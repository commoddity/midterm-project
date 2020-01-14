module.exports = (db) => {
  return {
    getOrders: () => {
      const queryString = `
      SELECT *
      FROM orders
      `
      return db.query(queryString)
      .then((res) => res.rows)
      .catch((err) => {
        console.error('query error', err.stack);
      });
    }
  }
};
