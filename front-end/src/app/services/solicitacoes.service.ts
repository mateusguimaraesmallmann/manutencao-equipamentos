import { Injectable, inject } from '@angular/core';
import { Solicitacao, EstadoSolicitacao } from '../shared/models/solicitacao.model';
import { BehaviorSubject, Observable } from 'rxjs';


const STORAGE_KEY = 'solicitacoes';

@Injectable({ providedIn: 'root' })
export class SolicitacoesService {
  private _solicitacoes$ = new BehaviorSubject<Solicitacao[]>([]);
  solicitacoes$ = this._solicitacoes$.asObservable();

  constructor() {
    this.seedIfEmpty();
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

  private seedIfEmpty() {
    const exists = localStorage.getItem(STORAGE_KEY);
    if (exists) return;

    const now = new Date();
    const mkDate = (minusHours: number) => new Date(now.getTime() - minusHours * 3600_000).toISOString();

    const seed: Solicitacao[] = [
      {
        id: crypto.randomUUID(),
        createdAt: mkDate(24),
        clienteNome: 'João',
        descricaoProduto: 'Notebook Lenovo IdeaPad 3 com tela trincada',
        estado: EstadoSolicitacao.ABERTA,
      },
      {
        id: crypto.randomUUID(),
        createdAt: mkDate(20),
        clienteNome: 'Joana',
        descricaoProduto: 'Impressora HP LaserJet com atolamento recorrente',
        estado: EstadoSolicitacao.ABERTA,
      },
      {
        id: crypto.randomUUID(),
        createdAt: mkDate(12),
        clienteNome: 'José',
        descricaoProduto: 'Desktop gamer sem vídeo após atualização BIOS',
        estado: EstadoSolicitacao.ORCADA,
      },
      {
        id: crypto.randomUUID(),
        createdAt: mkDate(4),
        clienteNome: 'Joaquina',
        descricaoProduto: 'Teclado mecânico com teclas falhando',
        estado: EstadoSolicitacao.ABERTA,
      },
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}
