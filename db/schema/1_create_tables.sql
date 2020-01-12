DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255),
  phone_number VARCHAR(22) NOT NULL,
  email VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(22) NOT NULL,
  email VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  street_address VARCHAR(255) NOT NULL,
  postal_code VARCHAR(255) NOT NULL,
  delivery_start_time TIME,
  delivery_end_time TIME
);

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  image_url VARCHAR(255),
  available BOOLEAN DEFAULT true
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  time_placed TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  time_ready TIMESTAMP DEFAULT NULL,
  picked_up BOOLEAN DEFAULT false
);

CREATE TABLE order_items (
  menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  PRIMARY KEY (menu_item_id, order_id)
);


