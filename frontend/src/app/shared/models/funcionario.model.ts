export class Funcionario {
    id: string;
    email: string;
    nome: string;
    senha: string;

    constructor(id: string, email: string, nome: string, senha: string) {
        this.id = id;
        this.email = email;
        this.nome = nome;
        this.senha = senha;
    }
}   

    /*  para colocar no json server
    "funcionario": [
          {
            "id": "JKLK",
            "email": "maria@maria.com"
            "nome": "Maria Maria"
            "senha": "maria"
          },
          {
            "id": "YYYY",
            "email": "mario@mario.com"
            "nome": "Mario Mario"
            "senha": "mario"
          }
    ]
    
    */
