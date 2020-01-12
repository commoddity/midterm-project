INSERT INTO users (name, password, email, phone_number)
VALUES ('Geordi Laforge', '1234', 'abc@cd.com', '123-4567');

INSERT INTO restaurants (name, phone_number, email, city, street_address, postal_code)
VALUES ('Bons on Broadway', '222-3333', 'bons@bons.com', 'Vancouver', '1234 Broadway Ave.', 'VVV 111');

INSERT INTO menu_items (restaurant_id, name, price)
VALUES (1, 'Eggs Benny', 10),
(1, 'Omelette', 9),
(1, 'Fruit Salad', 7),
(1, 'Chicken and Waffles', 12),
(1, 'Hashbrowns', 5),
(1, 'Breakfast Burrito', 9),
(1, 'Fried Egg', 3);

INSERT INTO orders (restaurant_id, user_id)
VALUES (1, 1),
(1, 1);
