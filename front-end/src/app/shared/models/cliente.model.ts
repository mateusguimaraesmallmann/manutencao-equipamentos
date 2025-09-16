export interface Endereco {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    complemento?: string;
  }
  
  export interface Cliente {
    id: string;
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    endereco: Endereco;
    createdAt?: string;
    ativo?: boolean;
  }
  