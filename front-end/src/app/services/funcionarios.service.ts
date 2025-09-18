import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Funcionario } from '../shared/models/funcionario.model';

const LS_KEY = 'funcionarios';

@Injectable({ providedIn: 'root' })
export class FuncionariosService {
  private _state = new BehaviorSubject<Funcionario[]>([]);
  funcionarios$ = this._state.asObservable();
  ativas$ = this.funcionarios$.pipe(map(list => list.filter(f => f.ativo)));

  constructor() {
    this.seedSeVazio();
    this.load();
  }

  private load() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const arr: Funcionario[] = raw ? JSON.parse(raw) : [];
      this._state.next(arr);
    } catch {
      this._state.next([]);
    }
  }
  private save(list: Funcionario[]) {
    localStorage.setItem(LS_KEY, JSON.stringify(list));
    this._state.next(list);
  }

  private seedSeVazio() {
    if (localStorage.getItem(LS_KEY)) return;
    const now = new Date().toISOString();
    const uuid = () => (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));

    const mk = (nome: string, email: string, dataNascimento: string): Funcionario => ({
      id: uuid(),
      nome, email, dataNascimento,
      senhaHash: '', senhaSalt: '',
      ativo: true, createdAt: now
    });

    const base: Funcionario[] = [
      mk('Maria', 'maria@empresa.com', '1990-05-10'),
      mk('Mário', 'mario@empresa.com', '1988-11-20'),
    ];

    Promise.all(base.map(async f => {
      const { salt, hash } = await this.hashSenha('1234');
      return { ...f, senhaSalt: salt, senhaHash: hash };
    })).then(list => localStorage.setItem(LS_KEY, JSON.stringify(list)));
  }

  private async hashSenha(senha: string): Promise<{ salt: string; hash: string }> {
    const te = new TextEncoder();
    const saltBytes = new Uint8Array(16);
    globalThis.crypto.getRandomValues(saltBytes);
    const salt = btoa(String.fromCharCode(...saltBytes));

    const data = te.encode(`${salt}:${senha}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    const hash = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return { salt, hash };
  }

  private async rehashSenhaComSalt(senha: string, salt: string): Promise<string> {
    const te = new TextEncoder();
    const data = te.encode(`${salt}:${senha}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)));
  }

  private currentUserEmail(): string | undefined {
    try { return JSON.parse(localStorage.getItem('currentUser') || '{}')?.email; }
    catch { return undefined; }
  }
  private emailJaExiste(email: string, list: Funcionario[], ignoreId?: string): boolean {
    return list.some(f => f.email.toLowerCase() === email.toLowerCase() && f.id !== ignoreId);
  }
  private ativosCount(list: Funcionario[]) { return list.filter(f => f.ativo).length; }

  criar(payload: { nome: string; email: string; dataNascimento: string; senha: string }): Observable<Funcionario | undefined> {
    const list = this._state.value.slice();
    const email = payload.email.trim();
    if (!email || this.emailJaExiste(email, list)) return of(undefined);

    return from(this.hashSenha(payload.senha)).pipe(
      map(({ salt, hash }) => {
        const novo: Funcionario = {
          id: globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2),
          nome: payload.nome.trim(),
          email,
          dataNascimento: payload.dataNascimento,
          senhaSalt: salt,
          senhaHash: hash,
          ativo: true,
          createdAt: new Date().toISOString()
        };
        list.push(novo);
        this.save(list);
        return novo;
      })
    );
  }

  atualizar(id: string, payload: { nome: string; dataNascimento: string; senha?: string }): Observable<Funcionario | undefined> {
    const list = this._state.value.slice();
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) return of(undefined);

    const atual = { ...list[idx] };
    atual.nome = payload.nome.trim();
    atual.dataNascimento = payload.dataNascimento;
    atual.updatedAt = new Date().toISOString();

    if (!payload.senha) {
      list[idx] = atual;
      this.save(list);
      return of(atual);
    }

    return from(this.rehashSenhaComSalt(payload.senha, atual.senhaSalt)).pipe(
      map(hash => {
        atual.senhaHash = hash;
        list[idx] = atual;
        this.save(list);
        return atual;
      })
    );
  }

  remover(id: string): Observable<boolean> {
    const list = this._state.value.slice();
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) return of(false);

    const me = this.currentUserEmail();
    if (list[idx].email === me) return of(false);
    if (this.ativosCount(list) <= 1) return of(false);
    if (!list[idx].ativo) return of(true);
    list[idx] = { ...list[idx], ativo: false, updatedAt: new Date().toISOString() };
    this.save(list);
    return of(true);
  }

  reativar(id: string): Observable<boolean> {
    const list = this._state.value.slice();
    const idx = list.findIndex(f => f.id === id);
    if (idx === -1) return of(false);
    if (list[idx].ativo) return of(true);
    list[idx] = { ...list[idx], ativo: true, updatedAt: new Date().toISOString() };
    this.save(list);
    return of(true);
  }
}
