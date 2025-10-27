import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SolicitacaoCreateDTO } from '../shared/dtos/solicitacao-create.dto';
import { SolicitacaoResumoDTO } from '../shared/dtos/solicitacao-cliente-resumo.dto';
import { SolicitacaoDetalheDTO } from '../shared/dtos/solicitacao-cliente-detalhe-dto';
import { FuncionarioSolicitacaoResumoDTO } from '../shared/dtos/solicitacao-funcionario-resumo.dto';
import { FuncionarioSolicitacaoDetalheDTO } from '../shared/dtos/solicitacao-funcionario-detalhe.dto';

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

  listarSolicitacoesAbertas(): Observable<FuncionarioSolicitacaoResumoDTO[]> {
    return this.http.get<FuncionarioSolicitacaoResumoDTO[]>(`${API}/abertas`);
  }

  buscarSolicitacaoClientePorId(id: number): Observable<SolicitacaoDetalheDTO> {
    return this.http.get<SolicitacaoDetalheDTO>(`${API}/detalhe/cliente/${id}`);
  }

  buscarSolicitacaoFuncionarioPorId(id: number): Observable<FuncionarioSolicitacaoDetalheDTO> {
    return this.http.get<FuncionarioSolicitacaoDetalheDTO>(`${API}/detalhe/funcionario/${id}`);
  }

  registrarOrcamento(id: number, valor: number) {
    return this.http.post<any>(`${API}/orcamento/${id}`, valor);
  }

  registrarManutencao(id: number, body: { descricao: string; orientacoes: string }) {
    return this.http.post<void>(`${API}/manutencao/${id}`, body);
  }

  aprovar(id: number) {
    return this.http.post<void>(`${API}/aprovar/${id}`, null);
  }

  rejeitar(id: number ) {
    return this.http.post<void>(`${API}/rejeitar/${id}`, null);
  }

  resgatar(id: number ) {
    return this.http.post<void>(`${API}/resgatar/${id}`, null);
  }

  pagar(id: number ) {
    return this.http.post<void>(`${API}/pagar/${id}`, null);
  }

  //ainda nao funcional
  redirecionar(id: number, funcionarioDestinoId: number) {
    return this.http.post<void>(`${API}/redirecionar/${id}`, { funcionarioDestinoId });
  }

}