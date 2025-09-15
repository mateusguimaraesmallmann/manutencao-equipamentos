import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Solicitacao } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class SolicitacoesService {

  constructor() { }

  getSolicitacoesCliente(): Observable<Solicitacao[]> {
    const solicitacoes: Solicitacao[] = [
      { id: '1', createdAt: '2025-09-10T09:30:00', equipamentoDescricao: 'Troca de bateria do notebook', estado: 'ORÇADA' },
      { id: '2', createdAt: '2025-09-11T14:00:00', equipamentoDescricao: 'Conserto do teclado do notebook', estado: 'ARRUMADA' },
      { id: '3', createdAt: '2025-09-12T10:00:00', equipamentoDescricao: 'Manutenção preventiva', estado: 'APROVADA' },
    ];
    return of(solicitacoes);
  }
}
