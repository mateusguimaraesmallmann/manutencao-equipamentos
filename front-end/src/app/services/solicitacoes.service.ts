import { Injectable, inject } from '@angular/core';
import { Solicitacao, EstadoSolicitacao } from '../shared/models/solicitacao.model';
import { BehaviorSubject, Observable, of } from 'rxjs';

const STORAGE_KEY = 'solicitacoes';

@Injectable({ providedIn: 'root' })
export class SolicitacoesService {
  private _solicitacoes$ = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoes$ = this._solicitacoes$.asObservable();

  constructor() {
    this.criarMassaInicialSeVazia();
    this.loadAll();
  }

  private loadAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: Solicitacao[] = raw ? JSON.parse(raw) : [];
    this._solicitacoes$.next(list);
  }

  private saveAll(list: Solicitacao[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    this._solicitacoes$.next(list);
  }

  getSolicitacoesCliente() {
    return this.solicitacoes$;
  }

  listAbertasOrdenadas(): Observable<Solicitacao[]> {
    return this.solicitacoes$;
  }

  getById(id: string): Solicitacao | undefined {
    return this._solicitacoes$.value.find(s => s.id === id);
  }

  private criarMassaInicialSeVazia(): void {
    if (localStorage.getItem('solicitacoes')) return;
  
    const now = new Date();
    const agoH = (h: number) => new Date(now.getTime() - h * 3600_000).toISOString();
  
    const me = (() => {
      try {
        return JSON.parse(localStorage.getItem('currentUser') || '{}')?.email || 'func@example.com';
      } catch {
        return 'func@example.com';
      }
    })();
  
    const massa: Solicitacao[] = [
      { id: crypto.randomUUID(), createdAt: agoH(48), clienteNome: 'João',     descricaoProduto: 'Notebook com tela trincada',           estado: EstadoSolicitacao.ABERTA },
      { id: crypto.randomUUID(), createdAt: agoH(40), clienteNome: 'José',     descricaoProduto: 'Desktop sem vídeo',                    estado: EstadoSolicitacao['ORCADA'], orcamentoValor: 350 },
      { id: crypto.randomUUID(), createdAt: agoH(36), clienteNome: 'Joana',    descricaoProduto: 'Impressora atolando',                  estado: EstadoSolicitacao.REJEITADA },
      { id: crypto.randomUUID(), createdAt: agoH(30), clienteNome: 'Joaquina', descricaoProduto: 'Teclado intermitente',                 estado: EstadoSolicitacao.APROVADA },
      { id: crypto.randomUUID(), createdAt: agoH(24), clienteNome: 'Mario',    descricaoProduto: 'Mouse com duplo clique',               estado: EstadoSolicitacao.REDIRECIONADA, redirecionadaPara: { email: me } },
      { id: crypto.randomUUID(), createdAt: agoH(18), clienteNome: 'Maria',    descricaoProduto: 'Notebook superaquecendo',              estado: EstadoSolicitacao.ARRUMADA },
      { id: crypto.randomUUID(), createdAt: agoH(12), clienteNome: 'Paula',    descricaoProduto: 'Desktop travando',                     estado: EstadoSolicitacao.PAGA },
      { id: crypto.randomUUID(), createdAt: agoH( 6), clienteNome: 'Pedro',    descricaoProduto: 'Impressora sem tinta',                 estado: EstadoSolicitacao.FINALIZADA },
    ];
  
    localStorage.setItem('solicitacoes', JSON.stringify(massa));
  }
  

registrarOrcamento(
  id: string,
  valor: number,
  funcionario: { nome: string; email?: string }
): Observable<Solicitacao | undefined> {
  const list = this._solicitacoes$.value.slice();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return of(undefined);

  const nowIso = new Date().toISOString();

  const atual = { ...list[idx] };
  const de = atual.estado;

  atual.orcamentoValor = valor;
  atual.estado = EstadoSolicitacao.ORCADA;
  atual.historico = [
    ...(atual.historico ?? []),
    { quando: nowIso, de, para: EstadoSolicitacao.ORCADA, funcionario: funcionario.nome }
  ];

  list[idx] = atual;
  this.saveAll(list);

  return of(atual);
}


}
