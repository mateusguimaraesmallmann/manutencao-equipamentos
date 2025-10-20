import { EstadoSolicitacao } from "../models/solicitacao.model";

export interface FuncionarioSolicitacaoResumoDTO {
  id: number;
  createdAt: string;
  clienteNome: string;
  descricaoProduto: string;
  estado: EstadoSolicitacao | string;
}