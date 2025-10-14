import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Funcionario } from '../shared/models/funcionario.model';
import { AutenticacaoService } from './autenticacao.service';

const API_BASE = 'http://localhost:8080';
const API = `${API_BASE}/funcionarios`;

export interface FuncionarioCriarPayload {
  nome: string;
  email: string;
  senha: string;
  dataNascimento: string;
}

export interface FuncionarioAtualizarPayload {
  nome: string;
  dataNascimento: string;
}

@Injectable({ providedIn: 'root' })
export class FuncionariosService {
  private http = inject(HttpClient);
  private auth = inject(AutenticacaoService);

  private _state = new BehaviorSubject<Funcionario[]>([]);
  funcionarios$ = this._state.asObservable();

  constructor() {
    this.auth.user$.subscribe(user => {
      if (user) { this.refresh().subscribe(); }
      else { this._state.next([]); }
    });
  }

  refresh(): Observable<Funcionario[]> {
    return this.http.get<any[]>(API).pipe(
      map(arr => arr.map(this.normalize)),
      tap(list => this._state.next(list)),
      catchError(err => {
        console.error('Erro ao listar funcionários', err);
        this._state.next([]);
        return of([]);
      })
    );
  }

  buscarPorId(id: string): Observable<Funcionario | undefined> {
    return this.http.get<any>(`${API}/${id}`).pipe(
      map(this.normalize),
      catchError(err => {
        console.error('Erro ao buscar funcionário', err);
        return of(undefined);
      })
    );
  }

  criar(payload: FuncionarioCriarPayload): Observable<boolean> {
    const body = {
      nome: payload.nome.trim(),
      email: payload.email.trim().toLowerCase(),
      senha: payload.senha,
      dataNascimento: payload.dataNascimento
    };
    return this.http.post<any>(`${API}/criar`, body).pipe(
      map(this.normalize),
      tap(created => this._state.next([...this._state.value, created])),
      map(() => true),
      catchError(err => {
        if (err.status === 409) {
          console.warn('E-mail já existente');
          return of(false);
        }
        console.error('Falha ao criar funcionário', err);
        return of(false);
      })
    );
  }

  atualizar(id: string, payload: FuncionarioAtualizarPayload): Observable<boolean> {
    const body: any = {
      nome: payload.nome.trim(),
      dataNascimento: payload.dataNascimento
    };

    return this.http.put<any>(`${API}/${id}`, body).pipe(
      map(this.normalize),
      tap(updated => {
        const list = this._state.value.slice();
        const idx = list.findIndex(f => f.id === id);
        if (idx !== -1) { list[idx] = updated; this._state.next(list); }
      }),
      map(() => true),
      catchError(err => {
        console.error('Falha ao atualizar funcionário', err);
        return of(false);
      })
    );
  }

  remover(id: string): Observable<boolean> {
    return this.http.delete<void>(`${API}/${id}`).pipe(
      tap(() => {
        const list = this._state.value.slice();
        const idx = list.findIndex(f => f.id === id);
        if (idx === -1) return;

        const f = list[idx];
        if (f.ativo) {
          list[idx] = { ...f, ativo: false, updatedAt: new Date().toISOString() };
        } else {
          list.splice(idx, 1);
        }
        this._state.next(list);
      }),
      map(() => true),
      catchError(err => {
        if (err.status === 409 || err.status === 422) {
          console.warn('Regra de negócio impediu a remoção', err.error);
          return of(false);
        }
        console.error('Falha ao remover funcionário', err);
        return of(false);
      })
    );
  }

  reativar(id: string): Observable<boolean> {
    return this.http.put<any>(`${API}/${id}/reativar`, {}).pipe(
      map(this.normalize),
      tap(updated => {
        const list = this._state.value.slice();
        const idx = list.findIndex(f => f.id === id);
        if (idx !== -1) { list[idx] = updated; this._state.next(list); }
        else { this._state.next([...list, updated]); }
      }),
      map(() => true),
      catchError(err => {
        console.error('Falha ao reativar funcionário', err);
        return of(false);
      })
    );
  }

  private normalize = (raw: any): Funcionario => ({
    id: String(raw.id ?? raw.userId ?? ''),
    nome: raw.nome ?? raw.nome ?? '',
    email: raw.email ?? '',
    dataNascimento: raw.dataNascimento ?? raw.dataNascimento ?? raw.dataNascimento ?? '',
    ativo: raw.ativo ?? raw.ativo ?? true,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt ?? raw.updateAt
  });

}