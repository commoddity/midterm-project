module.exports = (db) => {
  return {
    getRestaurants: (restaurantId) => {
      const queryString = `
      SELECT id, name, phone_number, email, city, street_address, postal_code
      FROM restaurants
      WHERE id = ${restaurantId}
      `;
      return db.query(queryString)
        .then((res) => res.rows)
        .catch((err) => {
          console.error('query error', err.stack);
        });
    }
  };
};
