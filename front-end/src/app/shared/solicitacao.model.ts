export type EstadoSolicitacao =
  | 'ORÇADA'
  | 'APROVADA'
  | 'REJEITADA'
  | 'ARRUMADA'
  | 'OUTRO';

export interface Solicitacao {
  id: string;
  createdAt: string | Date;           // Data/Hora da solicitação
  equipamentoDescricao: string;       // Descrição do equipamento
  estado: EstadoSolicitacao;          // Estado da Solicitação
}
