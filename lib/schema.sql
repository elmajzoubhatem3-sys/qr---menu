CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  price NUMERIC(10,2) NOT NULL,
  image_url TEXT NOT NULL DEFAULT '',
  is_best_seller BOOLEAN NOT NULL DEFAULT FALSE,
  is_spicy BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO categories (name, sort_order)
SELECT 'Burgers', 1
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Burgers');

INSERT INTO categories (name, sort_order)
SELECT 'Pizza', 2
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Pizza');

INSERT INTO categories (name, sort_order)
SELECT 'Drinks', 3
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE name = 'Drinks');