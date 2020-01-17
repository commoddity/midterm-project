DROP TABLE IF EXISTS restaurants CASCADE;

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

GRANT ALL PRIVILEGES ON TABLE restaurants TO labber;

GRANT ALL ON SEQUENCE restaurants_id_seq TO labber;
