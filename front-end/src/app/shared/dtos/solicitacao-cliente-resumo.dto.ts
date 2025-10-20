import { EstadoSolicitacao } from "../models/solicitacao.model";

export interface SolicitacaoResumoDTO {
    id: number;
    createdAt: String;
    descricaoProduto: String;
    estado: EstadoSolicitacao;
}