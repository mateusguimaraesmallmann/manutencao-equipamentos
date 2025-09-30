// src/app/services/solicitacoes.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Solicitacao, EstadoSolicitacao } from '../shared/models/solicitacao.model';

@Injectable({ providedIn: 'root' })
export class SolicitacoesService {
  private http = inject(HttpClient);

  // private API_URL = environment.apiUrl + '/solicitacoes';
  private API_URL = '/api/solicitacoes';

  private _solicitacoes$ = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoes$ = this._solicitacoes$.asObservable();

  constructor() {
    this.refresh().subscribe();
  }

  refresh(): Observable<Solicitacao[]> {
    return this.http.get<Solicitacao[]>(this.API_URL).pipe(
      tap(list => this._solicitacoes$.next(list ?? []))
    );
  }

  getSolicitacoesCliente(emailCliente: string): Observable<Solicitacao[]> {
    // return this.http.get<Solicitacao[]>(`${this.API_URL}?clienteEmail=${encodeURIComponent(emailCliente)}`)
    //   .pipe(tap(list => this.mergeCache(list)));

    return this.refresh().pipe(
      map(list => (list || []).filter(s => s.clienteEmail?.toLowerCase() === emailCliente.toLowerCase()))
    );
  }

  listAbertasOrdenadas(): Observable<Solicitacao[]> {
    // return this.http.get<Solicitacao[]>(`${this.API_URL}?estado=ABERTA&_sort=createdAt&_order=asc`);

    return this.refresh().pipe(
      map(list =>
        (list || [])
          .filter(s => s.estado === EstadoSolicitacao.ABERTA)
          .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      )
    );
  }

  getById$(id: string): Observable<Solicitacao> {
    return this.http.get<Solicitacao>(`${this.API_URL}/${id}`);
  }

  getByIdSync(id: string): Solicitacao | undefined {
    return this._solicitacoes$.value.find(s => s.id === id);
  }

  registrarOrcamento(
    id: string,
    valor: number,
    funcionario: { nome: string; email?: string }
  ): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.API_URL}/${id}/orcamento`, {
      valor,
      funcionario
    }).pipe(
      tap(updated => this.upsertInCache(updated))
    );
  }

  efetuarManutencao(
    id: string,
    dados: { descricao: string; orientacoes?: string },
    funcionario: { nome: string; email?: string }
  ): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.API_URL}/${id}/manutencao`, {
      descricao: dados.descricao,
      orientacoes: dados.orientacoes ?? '',
      funcionario
    }).pipe(
      tap(updated => this.upsertInCache(updated))
    );
  }

  redirecionarManutencao(
    id: string,
    destino: { nome: string; email: string; id?: string },
    funcionarioOrigem: { nome: string; email?: string }
  ): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.API_URL}/${id}/redirecionar`, {
      destino,
      funcionarioOrigem
    }).pipe(
      tap(updated => this.upsertInCache(updated))
    );
  }

  finalizarSolicitacao(
    id: string,
    funcionario: { nome: string; email?: string }
  ): Observable<Solicitacao> {
    return this.http.patch<Solicitacao>(`${this.API_URL}/${id}/finalizar`, {
      funcionario
    }).pipe(
      tap(updated => this.upsertInCache(updated))
    );
  }

  private upsertInCache(item: Solicitacao | undefined) {
    if (!item) return;
    const list = this._solicitacoes$.value.slice();
    const idx = list.findIndex(s => s.id === item.id);
    if (idx >= 0) list[idx] = item; else list.push(item);
    this._solicitacoes$.next(list);
  }

  private mergeCache(list: Solicitacao[]) {
    const map = new Map<string, Solicitacao>();
    for (const s of this._solicitacoes$.value) map.set(s.id, s);
    for (const s of (list || [])) map.set(s.id, s);
    this._solicitacoes$.next(Array.from(map.values()));
  }
}

