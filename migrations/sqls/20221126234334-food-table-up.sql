CREATE TABLE food(
    id SERIAL PRIMARY KEY,
    food_name VARCHAR(50) NOT NULL,
    food_ingredients VARCHAR(50) NOT NULL,
    price integer NOT NULL,
    food_image_link VARCHAR(500),
    food_image_upload VARCHAR(500),
    quantity integer
)