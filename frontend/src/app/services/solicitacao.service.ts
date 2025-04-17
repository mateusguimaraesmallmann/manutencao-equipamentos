import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  criarSolicitacao(descricao: string, categoria_id: string,
    solicitante_id: string): Observable<Solicitacao> {

    this.solicitacao = new Solicitacao('', new Date().toISOString(),
      descricao, categoria_id, solicitante_id, Status.ABERTA);

    console.log(this.solicitacao);
    return this.http.post<Solicitacao>(this.apiUrl, this.solicitacao);

  }

}
