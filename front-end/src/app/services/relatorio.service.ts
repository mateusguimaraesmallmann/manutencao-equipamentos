import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type LinhaDia = { dia: string; total: number };
export type LinhaCategoria = { categoria: string; total: number };

const API_BASE = 'http://localhost:8080';
const API = `${API_BASE}/relatorios`;

@Injectable({ providedIn: 'root' })
export class RelatorioService {

  constructor(private http: HttpClient) {}

  obterReceitasPorDia(params?: Record<string, string>): Observable<LinhaDia[]> {
    const httpParams = new HttpParams({ fromObject: params ?? {} });
    return this.http.get<LinhaDia[]>(`${API}/receitas-por-dia`, { params: httpParams });
  }

  obterReceitasPorCategoria(): Observable<LinhaCategoria[]> {
    return this.http.get<LinhaCategoria[]>(`${API}/receitas-por-categoria`);
  }

}