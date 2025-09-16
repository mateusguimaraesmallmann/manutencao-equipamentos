export enum EstadoSolicitacao {
  ABERTA = 'ABERTA',
  ORCADA = 'ORÇADA',
  REJEITADA = 'REJEITADA',
  APROVADA = 'APROVADA',
  REDIRECIONADA = 'REDIRECIONADA',
  ARRUMADA = 'ARRUMADA',
  PAGA = 'PAGA',
  FINALIZADA = 'FINALIZADA',
}

export interface Solicitacao {
  id: string;
  createdAt: string;
  clienteNome: string;
  descricaoProduto: string;
  estado: EstadoSolicitacao;
  orcamentoValor?: number;
  historico?: Array<{ quando: string; de: EstadoSolicitacao; para: EstadoSolicitacao; funcionario?: string; }>;
}