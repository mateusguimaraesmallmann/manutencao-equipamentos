import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoCreateDTO } from '../shared/dtos/solicitacao-create.dto';
import { SolicitacaoResumoDTO } from '../shared/dtos/solicitacao-resumo.dto';

export interface SolicitacaoDTO {
  id: number;
  descricaoProduto: string;
  defeito?: string;
  estado: string;
  createdAt: string;
  categoriaId: number;
}

const API_BASE = 'http://localhost:8080';
const API = `${API_BASE}/solicitacoes`;

@Injectable({ providedIn: 'root' })
export class SolicitacoesService {

  constructor(private http: HttpClient) {}

  criar(dto: SolicitacaoCreateDTO): Observable<SolicitacaoDTO> {
    return this.http.post<any>(API, dto);
  }

  listarSolicitacoesByCliente(): Observable<SolicitacaoResumoDTO[]> {
    const raw = localStorage.getItem('auth_user');
    const user = raw ? JSON.parse(raw) : null;

    return this.http.get<SolicitacaoResumoDTO[]>(`${API}/cliente/` + user.id);
  }

}