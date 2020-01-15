module.exports = (db) => {
  return {
    postOrder: () => {
        const queryString = `
        INSERT INTO orders(restaurant_id, user_id, picked_up)
        VALUES (1, 1);
        `
      return db.query(queryString)
      .then((res) => res.rows)
      .catch((err) => {
        console.error('query error', err.stack);
      });
    },

    postOrderItems: (orderData) => {
      for (let [id, quantity] of Object.entries(orderData)) {
        const queryString = `
        INSERT INTO orders(restaurant_id, user_id, picked_up)
        VALUES ($1, $2, true);
        `
        values = [id, quantity];
        return db.query(queryString, values)
        .then((res) => res.rows)
        .catch((err) => {
          console.error('query error', err.stack);
        });
      }
    }
  }
};

// Functions here need work ^^^^
