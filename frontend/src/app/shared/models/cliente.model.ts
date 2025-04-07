export class Cliente {
    id: string;
    email: string;
    nome: string;
    cpf: string;
    senha: string;
    cep: string;
    cidade: string;
    estado: string;
    numero_endereco: number;

    constructor(id: string, email: string, nome: string, cpf: string, senha: string, cep: string, cidade: string, estado: string, numero_endereco: number) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.cep = cep;
        this.cidade = cidade;
        this.estado = estado;
        this.numero_endereco = numero_endereco;
    }
}


/*  para colocar no json server

    {
        "cliente": [
          {
            "id": "ABCD",
            "email": "joao@joao.com"
            "nome": "João João"
            "cpf": "11111111111"
            "senha": "joao"
            "cep":
            "cidade": "Curitiba"
            "estado": "Paraná"
            "numero_endereco": 500 
          },
            {
            "id": "JkLm",
            "email": "jose@jose.com"
            "nome": "José José"
            "cpf": "22222222222"
            "senha": "jose"
            "cep":
            "cidade": "Guarapuava"
            "estado": "Paraná"
            "numero_endereco": 500 
          },
          {
            "id": "BBBB",
            "email": "joana@joana.com"
            "nome": "Joana Joana"
            "cpf": "33333333333"
            "senha": "joana"
            "cep":
            "cidade": "Manaus"
            "estado": "Amazonas"
            "numero_endereco": 500 
          },
          {
            "id": "CCCC",
            "email": "joaquina@joaquina.com"
            "nome": "joaquina joaquina"
            "cpf": "33333333333"
            "senha": "joaquina"
            "cep":
            "cidade": "São Paulo"
            "estado": "São Paulo"
            "numero_endereco": 500 
          },

    }
      
*/