import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type LinhaDia = { dia: string; total: number };
export type LinhaCategoria = { categoria: string; total: number };

const API_BASE = 'http://localhost:8080';
const API = `${API_BASE}/relatorios`;

@Injectable({ providedIn: 'root' })
export class RelatorioService {

  private http = inject(HttpClient);

  obterReceitasPorDia(inicio?: string, fim?: string): Observable<LinhaDia[]> {
    let params = new HttpParams();
    if (inicio) {
      params = params.set('inicio', inicio);
    }
    if (fim) {
      params = params.set('fim', fim);
    }

    return this.http.get<LinhaDia[]>(`${API}/receitas-por-dia`, { params });
  }

  obterReceitasPorCategoria(): Observable<LinhaCategoria[]> {
    return this.http.get<LinhaCategoria[]>(`${API}/receitas-por-categoria`);
  }

}