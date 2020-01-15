module.exports = (db) => {
  return {
    postOrders: (orderData) => {
      const orderEntries = Object.entries(orderData);
      const ordersQueryString = `
      INSERT INTO orders (restaurant_id, user_id)
      VALUES (1, 1);
      `
      const idQuery = `
      SELECT id
      FROM orders
      ORDER BY id DESC
      LIMIT 1;
      `
      const orderItemsQueryString = `
      INSERT INTO order_items (menu_item_id, order_id, quantity)
      VALUES ($1, $2, $3);
      `
      db.query(ordersQueryString)
      .then(() => {
        db.query(idQuery)
        .then((lastOrder) => {
          for (let i = 0; i < orderEntries.length; i++) {
            const values = [Number(orderEntries[i][0]), lastOrder.rows[0].id, Number(orderEntries[i][1])];
            db.query(orderItemsQueryString, values)
            // .then(() => console.log(`Item ID: ${values[0]}\nOrder ID: ${values[1]}\nQuantity: ${values[2]}`))
            .catch(e => console.error(e));
          }
        })
      })
      .catch(e => console.error(e));
    }
  };
};

