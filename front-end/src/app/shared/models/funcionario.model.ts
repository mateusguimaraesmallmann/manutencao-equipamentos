export interface Funcionario {
    id: string;
    nome: string;
    email: string;
    dataNascimento: string;
    senhaHash: string;
    senhaSalt: string;
    ativo: boolean;
    createdAt: string;
    updatedAt?: string;
  }
  