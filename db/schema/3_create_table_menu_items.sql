DROP TABLE IF EXISTS menu_items CASCADE;

CREATE TABLE menu_items (
  id SERIAL PRIMARY KEY NOT NULL,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  blurb VARCHAR (1000),
  price INTEGER NOT NULL,
  image_url VARCHAR(255),
  available BOOLEAN DEFAULT true
);

GRANT ALL PRIVILEGES ON TABLE menu_items TO labber;

GRANT ALL ON SEQUENCE menu_items_id_seq TO labber;
