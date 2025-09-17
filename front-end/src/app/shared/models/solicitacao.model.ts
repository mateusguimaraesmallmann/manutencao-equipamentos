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

import { Cliente } from './cliente.model';

export interface Solicitacao {
  id: string;
  createdAt: string;
  clienteNome: string;
  clienteId?: string;
  cliente?: Cliente;
  descricaoProduto: string;
  estado: EstadoSolicitacao;
  orcamentoValor?: number;
  manutencaoDescricao?: string;
  manutencaoOrientacoes?: string;
  manutencaoData?: string;
  redirecionadaPara?: { id?: string; nome?: string; email?: string };
  historico?: Array<{
    quando: string;
    de: EstadoSolicitacao;
    para: EstadoSolicitacao;
    funcionario?: string;
  }>;
}
