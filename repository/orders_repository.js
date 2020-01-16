module.exports = function (db) {
  return {
    getLatestOrderId: async function ()  {
      const idQuery = `
      SELECT id
      FROM orders
      ORDER BY id DESC
      LIMIT 1;
      `
      await db.connect()
      const res = await db.query(idQuery);
      return res.rows[0].id;
    },

    postOrders: function () {
      const ordersQueryString = `
      INSERT INTO orders (restaurant_id, user_id)
      VALUES (1, 1);
      `
      db.query(ordersQueryString)
      .catch(e => console.error(e));
    },

    postOrderItems: function (orderData) {
      const orderEntries = Object.entries(orderData);
      const orderItemsQueryString = `
      INSERT INTO order_items (menu_item_id, order_id, quantity)
      VALUES ($1, $2, $3);
      `
      return this.getLatestOrderId()
      .then((lastOrder) => {
        console.log("LASTORDER->", lastOrder)
        for (let i = 0; i < orderEntries.length; i++) {
          const values = [Number(orderEntries[i][0]), lastOrder, Number(orderEntries[i][1])];
          db.query(orderItemsQueryString, values)
          .catch(e => console.error(e));
        }
      })
      .catch(e => console.error(e));
    },

    getOrder: async function () {
      const ordersQueryString = `
      SELECT order_id, menu_items.name AS name, menu_items.price AS price, quantity, orders.time_placed AS time_placed
      FROM order_items
      JOIN menu_items ON menu_items.id = menu_item_id
      JOIN orders ON orders.id = order_id
      WHERE order_id = $1
      `
      return this.getLatestOrderId()
      .then((lastOrder) => {
        values = [lastOrder];
        console.log("VALUES", values)
        db.query(ordersQueryString, values)
        .then((res) => {
        console.log("RES.ROWS ->", res.rows);
        return res.rows;
        })
        .catch(e => console.error(e));
      })
    }
  };
};

