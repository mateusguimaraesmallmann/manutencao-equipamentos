export class Solicitacao {
    private id: string;
    private data: string;
    private descricao: string;
    private categoria_id: string;
    private solicitante_id: string;
    private status: Status;


    constructor(id: string, data: string, descricao: string, categoria_id: string, status: Status) {
        this.id = id;
        this.data = data;
        this.descricao = descricao;
        this.categoria_id = categoria_id;
        this.solicitante_id = categoria_id;
        this.status = status;
    }
}

//ver se vai puxar certo como tipo de status
export enum Status {
    //[ABERTA, ORCADA, REJEITADA, APROVADA, REDIRECIONADA, ARRUMADA, PAGA, FINALIZADA         
	ABERTA = 'Aberta',
    ORCADA = 'Orçada',
    REJEITADA = 'Rejeitada',
    APROVADA = 'Aprovada',
    REDIRECIONADA = 'Redirecionada',
    ARRUMADA = 'Arrumada',
    PAGA = 'Paga',
    FINALIZADA = 'Finalizada'
}

/*
   "solicitacao": [
    {
      "id": "z812",
      "data": "2024-11-07T04:31:09.782Z",
      "descricao": "notebook não dá tela",
      "categoria_id": "OASD",
      "solicitante_id": "ABCD",
      "status": "Aberta"
    },
    {
      "id": "9cDi",
      "data": "2022-01-01T04:31:09.782Z",
      "descricao": "Desktop não liga",
      "categoria_id": "AS8d",
      "solicitante_id": "JkLm",
      "status": "Orçada"
    },
    {
      "id": "nb9D",
      "data": "2023-11-09T04:31:09.782Z",
      "descricao": "Impressora não imprime",
      "categoria_id": "asT1",
      "solicitante_id": "BBBB",
      "status": "Rejeitada"
    },
    {
      "id": "Hbc4",
      "data": "2023-11-08T04:31:09.782Z",
      "descricao": "Bolinha do mouse não gira",
      "categoria_id": "125j",
      "solicitante_id": "CCCC",
      "status": "Aprovada"
    },
    {
      "id": "125G",
      "data": "2024-01-10T04:31:09.782Z",
      "descricao": "Teclado molhado, não funciona",
      "categoria_id": "p5z0",
      "solicitante_id": "ABCD",
      "status": "Redirecionada"
    },
    {
      "id": "54bZ",
      "data": "2024-07-07T04:31:09.782Z",
      "descricao": "Webcam do notebook está embaçada",
      "categoria_id": "OASD",
      "solicitante_id": "JkLm",
      "status": "Arrumada",
    },
    {
      "id": "nCo2",
      "data": "2025-01-02T04:31:09.782Z",
      "descricao": "Teclado com mal contato",
      "categoria_id": "p5z0",
      "solicitante_id": "BBBB",
      "status": "Paga"
    },
    {
      "id": "yFzO",
      "data": "2024-11-03T04:31:09.782Z",
      "descricao": "Impressora sem tinta",
      "categoria_id": "asT1",
      "solicitante_id": "CCCC",
      "status": "Finalizada"
    },
    {
      "id": "Vaz1",
      "data": "2023-08-08T04:31:09.782Z",
      "descricao": "Desktop com vírus",
      "categoria_id": "AS8d",
      "solicitante_id": "ABCD",
      "status": "Aberta"
    },
    {
      "id": "Pnc7",
      "data": "2024-01-05T04:31:09.782Z",
      "descricao": "Mouse com cabo cortado",
      "categoria_id": "125j",
      "solicitante_id": "JkLm",
      "status": "Orçada"
    },
    {
      "id": "87zl",
      "data": "2024-02-02T04:31:09.782Z",
      "descricao": "Teclado com teclas quebradas",
      "categoria_id": "p5z0",
      "solicitante_id": "BBBB",
      "status": "Rejeitada"
    },
    {
      "id": "boIe",
      "data": "2022-02-02T04:31:09.782Z",
      "descricao": "Notebook com tela quebrada",
      "categoria_id": "OASD",
      "solicitante_id": "CCCC",
      "status": "Arrumada"
    },
    {
      "id": "99co",
      "data": "2021-02-04T04:34:09.782Z",
      "descricao": "Desktop com superaquecimento",
      "categoria_id": "AS8d",
      "solicitante_id": "ABCD",
      "status": "Arrumada"
    },
    {
      "id": "nUa2",
      "data": "2024-02-01T04:31:09.782Z",
      "descricao": "Impressora com papel emperrado",
      "categoria_id": "asT1",
      "solicitante_id": "JkLm",
      "status": "Paga"
    },
    {
      "id": "z7yR",
      "data": "2024-03-08T04:31:09.782Z",
      "descricao": "Mouse com double click",
      "categoria_id": "125j",
      "solicitante_id": "BBBB",
      "status": "Finalizada"
    },
    {
      "id": "7cnG",
      "data": "2024-04-06T04:31:09.782Z",
      "descricao": "Teclado com teclas quebradas",
      "categoria_id": "p5z0",
      "solicitante_id": "CCCC",
      "status": "Aberta"
    },
    {
      "id": "aMh2",
      "data": "2021-05-05T04:31:09.782Z",
      "descricao": "Notebook com superaquecimento",
      "categoria_id": "OASD",
      "solicitante_id": "ABCD",
      "status": "Orçada"
    },
    {
      "id": "sBV5",
      "data": "2024-09-04T04:31:09.782Z",
      "descricao": "Desktop com gabinete amassado",
      "categoria_id": "AS8d",
      "solicitante_id": "JkLm",
      "status": "Rejeitada"
    },
    {
      "id": "9dvC",
      "data": "2024-10-03T04:12:09.782Z",
      "descricao": "Impressora com tinta vazando",
      "categoria_id": "asT1",
      "solicitante_id": "BBBB",
      "status": "Aprovada"
    },
    {
      "id": "7nv3",
      "data": "2022-11-02T04:31:09.782Z",
      "descricao": "Mouse sem conexão",
      "categoria_id": "125j",
      "solicitante_id": "CCCC",
      "status": "Redirecionada"
    },
    {
      "id": "2vX1",
      "data": "2024-11-11T04:31:09.782Z",
      "descricao": "Teclado com teclas invertidas",
      "categoria_id": "p5z0",
      "solicitante_id": "ABCD",
      "status": "Arrumada"
    },
    {
      "id": "3gY1",
      "data": "2024-12-01T04:44:09.782Z",
      "descricao": "Notebook travando",
      "categoria_id": "OASD",
      "solicitante_id": "JkLm",
      "status": "Paga"
    },
    {
      "id": "4hn2",
      "data": "2022-01-11T01:31:09.782Z",
      "descricao": "Desktop com monitor piscando",
      "categoria_id": "AS8d",
      "solicitante_id": "BBBB",
      "status": "Finalizada"
    },
    {
      "id": "1zFf",
      "data": "2024-12-01T04:31:09.782Z",
      "descricao": "Impressora com papel atolado",
      "categoria_id": "asT1",
      "solicitante_id": "CCCC",
      "status": "Aberta"
    },
    {
      "id": "8gY2",
      "data": "2024-11-01T04:31:09.782Z",
      "descricao": "Mouse com scroll quebrado",
      "categoria_id": "125j",
      "solicitante_id": "ABCD",
      "status": "Orçada"
    },
    {
      "id": "5hZ3",
      "data": "2024-10-01T04:31:09.782Z",
      "descricao": "Teclado com teclas faltando",
      "categoria_id": "p5z0",
      "solicitante_id": "JkLm",
      "status": "Rejeitada"
    },
    {
      "id": "6iX4",
      "data": "2024-09-01T04:31:09.782Z",
      "descricao": "Notebook sem som",
      "categoria_id": "OASD",
      "solicitante_id": "BBBB",
      "status": "Arrumada"
    },
    {
      "id": "7jY5",
      "data": "2024-08-01T04:31:09.782Z",
      "descricao": "Desktop com teclado sem resposta",
      "categoria_id": "AS8d",
      "solicitante_id": "CCCC",
      "status": "Paga"
    }
  ]
*/