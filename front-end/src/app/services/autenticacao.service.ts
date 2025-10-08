import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

const API_BASE = 'http://localhost:8080';
const API_LOGIN = `${API_BASE}/auth/login`;
const API_LOGOUT = `${API_BASE}/auth/logout`;

export type Perfil = 'CLIENTE' | 'FUNCIONARIO' | string;

export interface AuthUser {
  id?: string;
  nome?: string;
  email?: string;
  perfil?: Perfil;
}

@Injectable({ providedIn: 'root' })
export class AutenticacaoService {
  private _user = new BehaviorSubject<AuthUser | null>(null);
  user$ = this._user.asObservable();

  private _token: string | null = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  get token(): string | null {
    return this._token;
  }

  restoreFromStorage(): void {
    this._token = localStorage.getItem('auth_token');
    const rawUser = localStorage.getItem('auth_user');
    if (rawUser) {
      try { this._user.next(JSON.parse(rawUser)); } catch {}
    } else if (this._token) {
      this._user.next(this.decodeUserFromToken(this._token));
    }
  }

  login(email: string, senha: string): Observable<AuthUser> {
    const body = { login: email, senha };

    return this.http.post<any>(API_LOGIN, body).pipe(
      tap(res => {
        const token = this.extractToken(res);
        if (!token) 
            throw new Error('Token ausente na resposta');
        
        this._token = token;
        localStorage.setItem('auth_token', token);

        const user = this.decodeUserFromToken(token);
        this._user.next(user);
        localStorage.setItem('auth_user', JSON.stringify(user));
      }),
      map(() => this._user.value as AuthUser),
      catchError(err => {
        this._token = null;
        localStorage.removeItem('auth_token');
        this._user.next(null);
        localStorage.removeItem('auth_user');
        return throwError(() => err);
      })
    );
  }

  logout() {
    this._token = null;
    this._user.next(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  }

  private extractToken(res: any): string | null {
    return res?.token ?? res?.access_token ?? res?.accessToken ?? null;
  }

  private decodeUserFromToken(token: string): AuthUser {
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const email = payload.email ?? payload.sub ?? undefined;
      const nome  = payload.name ?? payload.nome ?? undefined;
      const role  = payload.role ?? payload.roles?.[0] ?? payload.perfil ?? undefined;
      const id    = payload.id ? String(payload.id) : undefined;
      return { id, nome, email, perfil: role };
    } catch {
      return {};
    }
  }
}