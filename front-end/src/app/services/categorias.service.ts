import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Categoria } from '../shared/models/categoria.model';
import { AutenticacaoService } from './autenticacao.service';

const API_BASE = 'http://localhost:8080';
const API = `${API_BASE}/categorias`;

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private _state = new BehaviorSubject<Categoria[]>([]);
  categorias$ = this._state.asObservable();

  ativas$ = this.categorias$.pipe(
    map(list => list.filter(c => c.ativo).sort((a, b) => a.nome.localeCompare(b.nome)))
  );

  constructor(private http: HttpClient, private auth: AutenticacaoService) {
    this.auth.user$.subscribe(user => {
      if (user) {
        this.refresh().subscribe();
      } else {
        this._state.next([]);
      }
    });
  }

  refresh(): Observable<Categoria[]> {
    return this.http.get<any[]>(API).pipe(
      map(arr => arr.map(this.normalize)),
      tap(list => this._state.next(list)),
      catchError(err => {
        console.error('Erro ao listar categorias', err);
        this._state.next([]);
        return of([]);
      })
    );
  }

  criar(nome: string): Observable<Categoria | undefined> {
    nome = (nome || '').trim();
    if (!nome) return of(undefined);

    const payload = { nome, ativo: true };
    return this.http.post<any>(API, payload).pipe(
      map(this.normalize),
      tap(created => this._state.next([...this._state.value, created])),
      catchError(() => of(undefined))
    );
  }

  atualizar(id: string, nome: string): Observable<Categoria | undefined> {
    nome = (nome || '').trim();
    if (!nome) return of(undefined);

    const atual = this._state.value.find(c => c.id === id);
    const payload: any = { nome, ativo: atual?.ativo ?? true };

    return this.http.put<any>(`${API}/${id}`, payload).pipe(
      map(this.normalize),
      tap(updated => {
        const list = this._state.value.slice();
        const idx = list.findIndex(c => c.id === id);
        if (idx !== -1) {
          list[idx] = updated;
          this._state.next(list);
        }
      }),
      catchError(() => of(undefined))
    );
  }

  remover(id: string): Observable<boolean> {
    return this.http.delete<void>(`${API}/${id}`).pipe(
      tap(() => {
        const list = this._state.value.slice();
        const idx = list.findIndex(c => c.id === id);

        if (idx === -1) return;

        if (list[idx].ativo) {
          list[idx] = { ...list[idx], ativo: false, updatedAt: new Date().toISOString() };
          this._state.next(list);
        } else {
          this._state.next(list.filter(c => c.id !== id));
        }
      }),
      map(() => true),
      catchError(() => of(false))
    );
  }

  reativar(id: string): Observable<boolean> {
    const atual = this._state.value.find(c => c.id === id);
    if (!atual) {
      return this.http.get<any>(`${API}/${id}`).pipe(
        map(this.normalize),
        switchMap(cat => this.http.put<any>(`${API}/${id}`, { nome: cat.nome, ativo: true })),
        map(this.normalize),
        tap(cat => this._merge(cat)),
        map(() => true),
        catchError(() => of(false))
      );
    }

    return this.http.put<any>(`${API}/${id}`, { nome: atual.nome, ativo: true }).pipe(
      map(this.normalize),
      tap(cat => this._merge(cat)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  private _merge(cat: Categoria) {
    const list = this._state.value.slice();
    const idx = list.findIndex(c => c.id === cat.id);
    if (idx === -1) this._state.next([...list, cat]);
    else { list[idx] = cat; this._state.next(list); }
  }

  private normalize = (raw: any): Categoria => ({
    id: String(raw.id),
    nome: raw.nome,
    ativo: !!raw.ativo,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt ?? undefined
  });

}