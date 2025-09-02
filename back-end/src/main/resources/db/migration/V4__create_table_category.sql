CREATE TABLE category (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

ALTER TABLE category ADD CONSTRAINT uk_category_name UNIQUE (name);