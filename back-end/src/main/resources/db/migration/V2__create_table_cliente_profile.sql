CREATE TABLE cliente_profile (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL UNIQUE,
  cpf VARCHAR(11) NOT NULL UNIQUE,
  phone VARCHAR(255),
  zip_code VARCHAR(20),
  city VARCHAR(120),
  state VARCHAR(80),
  number VARCHAR(30),
  complement VARCHAR(255),
  CONSTRAINT fk_cliente_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);