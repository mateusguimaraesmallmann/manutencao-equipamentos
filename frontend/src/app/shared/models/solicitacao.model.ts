export class Solicitacao {
    private id: string;
    private data: string;
    private descricao: string;
    private categoria_id: string;
    private status: Status;

/*
    "solicitacao": [
        {
            "id": "JKLK",
            "data":"2024-11-07T04:31:09.782Z"             
        }    


*/
    constructor(id: string, data: string, descricao: string, categoria_id: string, status: Status) {
        this.id = id;
        this.data = data;
        this.descricao = descricao;
        this.categoria_id = categoria_id;
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