export class Categoria {
    id: string;
    nome_tipo: string

    constructor(id: string, nome_tipo: string) {
        this.id = id;
        this.nome_tipo = nome_tipo;
    }
}

/*
    "categoria": [
        {
            "id": "OASD",
            "nome_tipo": "Notebook"
        },
        {
            "id": "AS8d",
            "nome_tipo": "Desktop"
        },
        {
            "id": "asT1",
            "nome_tipo": "Impressora"
        },
        {
            "id": "125j",
            "nome_tipo": "Mouse"
        },
        {
            "id": "p5z0",
            "nome_tipo": "Teclado"
        }
    ]

*/