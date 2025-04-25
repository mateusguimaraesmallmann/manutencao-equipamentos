import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import { Solicitacao, Status } from '../shared/models/solicitacao.model';


@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private apiUrl = 'http://localhost:3000/solicitacao'; // URL da API
  solicitacao!: Solicitacao;
  constructor(
    private http: HttpClient,

  ) { }

  //cria a solicitacao, com o status ABERTA e a data atual
  criarSolicitacao(descricao: string, categoria_id: string,
    solicitante_id: string): Observable<Solicitacao> {
    let dataHora = new Date().toISOString();
    this.solicitacao = new Solicitacao('', dataHora,
      descricao, categoria_id, solicitante_id, Status.ABERTA ,[Status.ABERTA, dataHora]);

    console.log(this.solicitacao);
    return this.http.post<Solicitacao>(this.apiUrl, this.solicitacao);
  }

  getSolicitacaoByID(id: string): Observable<Solicitacao> {
    return this.http.get<Solicitacao>(`${this.apiUrl}/${id}`);
  }    
  
  getSolicitacaoByFuncionarioID(funcionario_id: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}?funcionario_orcamento_id=${funcionario_id}`);
  }
  
  getSolicitacaoByClienteID(cliente_id: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}?cliente_id=${cliente_id}`);
  }

  getSolicitacaoByStatus(status_atual: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}?status_atual=${status_atual}`);
  }

  getSolicitacaoByCategoriaID(categoria_id: string): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(`${this.apiUrl}?categoria_id=${categoria_id}`);
  }

  adicionarOrcamento(idSolicitacao: string, valor_orcamento: number, funcionario_orcamento_id: string): Observable<Solicitacao> {
    //essa funcao faz um patch na solicitacaoo, adicionando o valor do orçamento e
    // o id do funcionario que fez o orcamento
    //e a data do orçamento
    //
    const url = `${this.apiUrl}/${idSolicitacao}`; // URL da API para atualizar a solicitação
    
    return this.http.get<Solicitacao>(url).pipe(
      switchMap(solicitacao => {
      const body = {
        valor_orcamento: valor_orcamento,
        funcionario_orcamento_id: funcionario_orcamento_id,
        data_orcamento: new Date().toISOString(),
        status_historico: [...solicitacao.status_historico, [Status.ORCADA, new Date().toISOString()]],
        status_atual: Status.ORCADA,
      };
      return this.http.patch<Solicitacao>(url, body);
      })
    );
    //return this.http.patch<Solicitacao>(url, body); // Envia a solicitação para a API
  }


  /* 
  FALTA FAZER AS SEGUINTES FUNCOES:
  - 
  */


}
