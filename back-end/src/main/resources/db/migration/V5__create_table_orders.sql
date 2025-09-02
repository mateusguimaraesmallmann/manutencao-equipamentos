CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  cliente_id BIGINT NOT NULL,
  categoria_id BIGINT NOT NULL,
  descricao_equipamento VARCHAR(255) NOT NULL,
  defeito VARCHAR(255) NOT NULL,
  data_hora TIMESTAMP NOT NULL,
  estado VARCHAR(30) NOT NULL CHECK (estado IN ('ABERTA','ORCADA','APROVADA','REJEITADA','REDIRECIONADA','PAGA','FINALIZADA','ARRUMADA')),
  valor_orcamento NUMERIC(14,2),
  CONSTRAINT fk_orders_cliente FOREIGN KEY (cliente_id)  REFERENCES users(id),
  CONSTRAINT fk_orders_categoria FOREIGN KEY (categoria_id) REFERENCES category(id)
);