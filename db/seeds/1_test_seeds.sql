INSERT INTO users (name, password, email, phone_number)
VALUES ('Geordi Laforge', '1234', 'abc@cd.com', '123-4567');

INSERT INTO restaurants (name, phone_number, email, city, street_address, postal_code)
VALUES ('Buns on Broadway', '222-3333', 'bons@bons.com', 'Vancouver', '1234 Broadway Ave.', 'VVV 111');

INSERT INTO menu_items (restaurant_id, name, price, image_url)
VALUES (1, 'Eggs Benny', 10, 'https://live.staticflickr.com/8864/18137445236_5d0a115631_b.jpg'),
(1, 'Omelette', 9, 'https://live.staticflickr.com/206/462917140_4fb7f4834b_b.jpg'),
(1, 'Fruit Salad', 7, 'https://live.staticflickr.com/5737/30622968353_35e06fcb52_b.jpg'),
(1, 'Chicken and Waffles', 12, 'https://live.staticflickr.com/4038/5076305757_ca194b361b_b.jpg'),
(1, 'Hashbrowns', 5, 'https://live.staticflickr.com/5198/7159593410_43df93b462_b.jpg'),
(1, 'Breakfast Burrito', 9, 'https://live.staticflickr.com/8106/8474708146_2bc8c2e139_b.jpg'),
(1, 'Fried Egg', 3, 'https://live.staticflickr.com/2907/13916201522_7079f48d50_b.jpg'),
(1, 'Huevos Rancheros', 9, 'https://live.staticflickr.com/4184/34512229055_0d9a81647d_b.jpg'),
(1, 'Pancakes', 7, 'https://live.staticflickr.com/65535/48305311782_35aae64b6b_b.jpg');
