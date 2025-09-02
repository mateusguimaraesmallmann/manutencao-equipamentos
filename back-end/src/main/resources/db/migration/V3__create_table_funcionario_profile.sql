CREATE TABLE funcionario_profile (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL,
  birthday DATE NULL,
  CONSTRAINT fk_funcionario_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);