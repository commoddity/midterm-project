module.exports = function (db, twilioParams) {
  return {
    getLatestOrderId: async function ()  {
      const idQuery = `
      SELECT id
      FROM orders
      ORDER BY id DESC
      LIMIT 1;
      `
      await db.connect();
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

    postOrderItems: async function (orderData) {
      const orderEntries = Object.entries(orderData);
      const orderItemsQueryString = `
      INSERT INTO order_items (menu_item_id, order_id, quantity)
      VALUES ($1, $2, $3);
      `
      const lastOrder = await this.getLatestOrderId();
      const promises = [];
      for (let i = 0; i < orderEntries.length; i++) {
        const values = [Number(orderEntries[i][0]), lastOrder, Number(orderEntries[i][1])];
        promises.push(db.query(orderItemsQueryString, values));
      };
      Promise.all(promises)
      .then((data) => data)
      .catch(e => console.error(e));
    },

    getOrder: async function () {
      const ordersQueryString = `
      SELECT order_id, menu_items.name AS name, menu_items.price AS price, quantity, orders.time_placed AS time_placed, users.name AS user_name, users.phone_number AS phone_number, users.email AS email
      FROM order_items
      JOIN menu_items ON menu_items.id = menu_item_id
      JOIN orders ON orders.id = order_id
      JOIN users ON users.id = user_id
      WHERE order_id = $1
      `
      const id = await this.getLatestOrderId()
      const values = [id];
      const res = await db.query(ordersQueryString, values);
      return res.rows;
    },

    sendMessage: (messageBody, userPhoneNumber) => {
      const twilioClient = require('twilio')(twilioParams.accountSid, twilioParams.authToken);
      return twilioClient.messages.create({
        body: `${messageBody}`,
        from: twilioParams.fromPhone,
        to: `${userPhoneNumber}`
      })
      .then((message) => message)
      .catch(e => console.error(e))
    }
  };
};

