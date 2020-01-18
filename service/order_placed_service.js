module.exports = (ordersService, db) => {
  return {
    getOrder: async function () {
      const ordersQueryString = `
      SELECT order_id, menu_items.name AS name, menu_items.price AS price, quantity, orders.time_placed AS time_placed, users.name AS user_name, users.phone_number AS phone_number, users.email AS email
      FROM order_items
      JOIN menu_items ON menu_items.id = menu_item_id
      JOIN orders ON orders.id = order_id
      JOIN users ON users.id = user_id
      WHERE order_id = $1
      `
      const id = await ordersService.getLatestOrderId()
      const values = [id];
      const res = await db.query(ordersQueryString, values);
      return res.rows;
    }
  };
};
