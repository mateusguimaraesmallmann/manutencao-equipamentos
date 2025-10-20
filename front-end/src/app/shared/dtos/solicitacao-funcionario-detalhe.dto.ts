export interface FuncionarioSolicitacaoDetalheDTO {
  id: number;
  createdAt: string;
  descricaoProduto: string;
  defeito?: string | null;
  estado: string;
  orcamentoValor?: number | null;
  cliente: {
    id: number;
    nome: string;
    email: string;
    telefone?: string | null;
    endereco?: {
      rua?: string; numero?: string; bairro?: string;
      cidade?: string; estado?: string; cep?: string;
    } | null;
  } | null;
  historico: Array<{
    quando: string;
    de: string | null;
    para: string;
    funcionario?: string | null;
  }>;
}