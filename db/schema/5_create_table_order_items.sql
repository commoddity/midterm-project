DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE order_items (
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  quantity INTEGER
);

GRANT ALL PRIVILEGES ON TABLE order_items TO labber;
