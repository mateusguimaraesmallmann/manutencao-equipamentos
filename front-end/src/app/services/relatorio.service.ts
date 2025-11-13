import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export type LinhaDia = { dia: string; total: number };
export type LinhaCategoria = { categoria: string; total: number };

@Injectable({ providedIn: 'root' })
export class RelatorioService {

  private http = inject(HttpClient);

  private readonly baseUrl = '/api/relatorios';

  obterReceitasPorDia(inicio?: string, fim?: string): Observable<LinhaDia[]> {
    let params = new HttpParams();
    if (inicio) {
      params = params.set('inicio', inicio);
    }
    if (fim) {
      params = params.set('fim', fim);
    }

    return this.http.get<LinhaDia[]>(`${this.baseUrl}/receitas-por-dia`, { params });
  }

  obterReceitasPorCategoria(): Observable<LinhaCategoria[]> {
    return this.http.get<LinhaCategoria[]>(`${this.baseUrl}/receitas-por-categoria`);
  }

}