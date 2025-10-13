export interface Funcionario {
  id: string;
  nome: string;
  email: string;
  dataNascimento: string;
  ativo: boolean;
  createdAt?: string;
  updatedAt?: string;
}