import { EstadoSolicitacao } from "../models/solicitacao.model";

export interface SolicitacaoDetalheDTO {
  id: number;
  createdAt: string;
  clienteNome: string | null;
  clienteEmail: string | null;
  descricaoProduto: string;
  defeito?: string | null;
  manutencaoDescricao: string;
  manutencaoOrientacoes: string;
  estado: EstadoSolicitacao | string;
  orcamentoValor?: number | null;
  historico: Array<{
    quando: string;
    de: EstadoSolicitacao | string | null;
    para: EstadoSolicitacao | string;
    funcionario?: string | null;
  }>;
}