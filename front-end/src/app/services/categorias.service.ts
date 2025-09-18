import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categoria } from '../shared/models/categoria.model';

const LS_KEY = 'categorias';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
  private _state = new BehaviorSubject<Categoria[]>([]);
  categorias$ = this._state.asObservable();

  ativas$ = this.categorias$.pipe(
    map(list => list.filter(c => c.ativo).sort((a, b) => a.nome.localeCompare(b.nome)))
  );

  constructor() {
    this.seedSeVazio();
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const arr: Categoria[] = raw ? JSON.parse(raw) : [];
      this._state.next(arr);
    } catch {
      this._state.next([]);
    }
  }

  private save(list: Categoria[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
    this._state.next(list);
  }

  private seedSeVazio() {
    if (localStorage.getItem(LS_KEY)) return;
    const now = new Date().toISOString();
    const uuid = () => (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));
    const base: string[] = ['Notebook', 'Desktop', 'Impressora', 'Mouse', 'Teclado', 'Microfone'];
    const seed: Categoria[] = base.map(nome => ({ id: uuid(), nome, ativo: true, createdAt: now }));
    localStorage.setItem(LS_KEY, JSON.stringify(seed));
  }

  criar(nome: string): Observable<Categoria | undefined> {
    nome = (nome || '').trim();
    if (!nome) return of(undefined);

    const list = this._state.value.slice();
    const byName = (n: string) => list.find(c => c.nome.toLowerCase() === n.toLowerCase());

    const existente = byName(nome);
    if (existente) {
      if (existente.ativo) return of(undefined);
      existente.ativo = true;
      existente.updatedAt = new Date().toISOString();
      this.save(list);
      return of(existente);
    }

    const nova: Categoria = {
      id: globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
      nome,
      ativo: true,
      createdAt: new Date().toISOString()
    };
    list.push(nova);
    this.save(list);
    return of(nova);
  }

  atualizar(id: string, nome: string): Observable<Categoria | undefined> {
    nome = (nome || '').trim();
    const list = this._state.value.slice();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1 || !nome) return of(undefined);

    const ja = list.find(c => c.id !== id && c.nome.toLowerCase() === nome.toLowerCase());
    if (ja) return of(undefined);

    list[idx] = { ...list[idx], nome, updatedAt: new Date().toISOString() };
    this.save(list);
    return of(list[idx]);
  }

  remover(id: string): Observable<boolean> {
    const list = this._state.value.slice();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return of(false);
    if (!list[idx].ativo) return of(true);

    list[idx] = { ...list[idx], ativo: false, updatedAt: new Date().toISOString() };
    this.save(list);
    return of(true);
  }

  reativar(id: string): Observable<boolean> {
    const list = this._state.value.slice();
    const idx = list.findIndex(c => c.id === id);
    if (idx === -1) return of(false);
    if (list[idx].ativo) return of(true);

    list[idx] = { ...list[idx], ativo: true, updatedAt: new Date().toISOString() };
    this.save(list);
    return of(true);
  }
}
