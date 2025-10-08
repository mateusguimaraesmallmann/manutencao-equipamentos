CREATE TABLE IF NOT EXISTS solicitacao (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  cliente_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  categoria_id BIGINT NULL REFERENCES category(id) ON DELETE SET NULL,
  descricao_produto VARCHAR(200) NOT NULL,
  defeito VARCHAR(500),
  estado VARCHAR(30)  NOT NULL CHECK (estado IN ('ABERTA','ORCADA','REJEITADA','APROVADA','REDIRECIONADA','ARRUMADA','PAGA','FINALIZADA')),
  valor_orcamento NUMERIC(14,2),
  paga_em TIMESTAMP,
  manutencao_descricao VARCHAR(500),
  manutencao_orientacoes VARCHAR(500),
  manutencao_data DATE,
  redirecionada_para_id BIGINT NULL REFERENCES users(id) ON DELETE SET NULL,
  finalizacao_data TIMESTAMP
);