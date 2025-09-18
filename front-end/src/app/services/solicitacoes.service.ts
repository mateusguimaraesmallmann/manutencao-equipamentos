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
  
    const now = Date.now();
    const h = (hrs: number) => new Date(now - hrs * 3600_000).toISOString();
    const uuid = () => (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2));
  
    const me = (() => {
      try { return JSON.parse(localStorage.getItem('currentUser') || '{}')?.email || 'mario@empresa.com'; }
      catch { return 'mario@empresa.com'; }
    })();
  
    const massa: Solicitacao[] = [
      // --- ABERTAS ---
      { id: uuid(), createdAt: h(72), clienteNome: 'João',   descricaoProduto: 'Notebook com tela trincada',   estado: EstadoSolicitacao.ABERTA },
      { id: uuid(), createdAt: h(71), clienteNome: 'Joana',  descricaoProduto: 'Desktop sem vídeo',            estado: EstadoSolicitacao.ABERTA },
      { id: uuid(), createdAt: h(70), clienteNome: 'José',   descricaoProduto: 'Impressora não puxa papel',    estado: EstadoSolicitacao.ABERTA },
  
      // --- ORÇADAS ---
      { id: uuid(), createdAt: h(60), clienteNome: 'Paula',  descricaoProduto: 'Mouse com duplo clique',       estado: EstadoSolicitacao.ORCADA, orcamentoValor: 180,
        historico: [{ quando: h(60), de: EstadoSolicitacao.ABERTA, para: EstadoSolicitacao.ORCADA, funcionario: 'Maria' }] },
      { id: uuid(), createdAt: h(58), clienteNome: 'Pedro',  descricaoProduto: 'Teclado com teclas falhando',  estado: EstadoSolicitacao.ORCADA, orcamentoValor: 120,
        historico: [{ quando: h(58), de: EstadoSolicitacao.ABERTA, para: EstadoSolicitacao.ORCADA, funcionario: 'Mário' }] },
      { id: uuid(), createdAt: h(56), clienteNome: 'Carla',  descricaoProduto: 'Monitor piscando',             estado: EstadoSolicitacao.ORCADA, orcamentoValor: 300,
        historico: [{ quando: h(56), de: EstadoSolicitacao.ABERTA, para: EstadoSolicitacao.ORCADA, funcionario: 'Maria' }] },
  
      // --- REJEITADAS ---
      { id: uuid(), createdAt: h(54), clienteNome: 'Guilherme', descricaoProduto: 'Notebook sem ligar',        estado: EstadoSolicitacao.REJEITADA, orcamentoValor: 650,
        historico: [
          { quando: h(55), de: EstadoSolicitacao.ABERTA,  para: EstadoSolicitacao.ORCADA,    funcionario: 'Mário' },
          { quando: h(54), de: EstadoSolicitacao.ORCADA,  para: EstadoSolicitacao.REJEITADA, funcionario: 'Cliente' }
        ] },
      { id: uuid(), createdAt: h(53), clienteNome: 'Bianca',    descricaoProduto: 'Impressora atolando',       estado: EstadoSolicitacao.REJEITADA, orcamentoValor: 220,
        historico: [
          { quando: h(54), de: EstadoSolicitacao.ABERTA,  para: EstadoSolicitacao.ORCADA,    funcionario: 'Maria' },
          { quando: h(53), de: EstadoSolicitacao.ORCADA,  para: EstadoSolicitacao.REJEITADA, funcionario: 'Cliente' }
        ] },
  
      // --- APROVADAS ---
      { id: uuid(), createdAt: h(48), clienteNome: 'Marcos', descricaoProduto: 'Scanner falhando',             estado: EstadoSolicitacao.APROVADA, orcamentoValor: 280,
        historico: [
          { quando: h(50), de: EstadoSolicitacao.ABERTA,  para: EstadoSolicitacao.ORCADA,   funcionario: 'Mário' },
          { quando: h(48), de: EstadoSolicitacao.ORCADA,  para: EstadoSolicitacao.APROVADA, funcionario: 'Cliente' }
        ] },
      { id: uuid(), createdAt: h(47), clienteNome: 'Fernanda', descricaoProduto: 'Desktop travando',           estado: EstadoSolicitacao.APROVADA, orcamentoValor: 400,
        historico: [
          { quando: h(49), de: EstadoSolicitacao.ABERTA,  para: EstadoSolicitacao.ORCADA,   funcionario: 'Maria' },
          { quando: h(47), de: EstadoSolicitacao.ORCADA,  para: EstadoSolicitacao.APROVADA, funcionario: 'Cliente' }
        ] },
      { id: uuid(), createdAt: h(46), clienteNome: 'Vitor',    descricaoProduto: 'Notebook superaquecendo',    estado: EstadoSolicitacao.APROVADA, orcamentoValor: 520,
        historico: [
          { quando: h(48), de: EstadoSolicitacao.ABERTA,  para: EstadoSolicitacao.ORCADA,   funcionario: 'Mário' },
          { quando: h(46), de: EstadoSolicitacao.ORCADA,  para: EstadoSolicitacao.APROVADA, funcionario: 'Cliente' }
        ] },
  
      // --- REDIRECIONADAS (destinadas a você) ---
      { id: uuid(), createdAt: h(40), clienteNome: 'Patrícia', descricaoProduto: 'All-in-one sem áudio',       estado: EstadoSolicitacao.REDIRECIONADA,
        redirecionadaPara: { email: me, nome: 'Você' },
        historico: [
          { quando: h(42), de: EstadoSolicitacao.ABERTA,        para: EstadoSolicitacao.APROVADA,     funcionario: 'Maria' },
          { quando: h(40), de: EstadoSolicitacao.APROVADA,      para: EstadoSolicitacao.REDIRECIONADA,funcionario: 'Maria → Você' }
        ] },
      { id: uuid(), createdAt: h(39), clienteNome: 'Renata',   descricaoProduto: 'Notebook sem Wi-Fi',         estado: EstadoSolicitacao.REDIRECIONADA,
        redirecionadaPara: { email: me, nome: 'Você' },
        historico: [
          { quando: h(41), de: EstadoSolicitacao.ABERTA,        para: EstadoSolicitacao.APROVADA,     funcionario: 'Mário' },
          { quando: h(39), de: EstadoSolicitacao.APROVADA,      para: EstadoSolicitacao.REDIRECIONADA,funcionario: 'Mário → Você' }
        ] },
  
      // --- ARRUMADAS ---
      { id: uuid(), createdAt: h(32), clienteNome: 'Helena',   descricaoProduto: 'Teclado não detectado',      estado: EstadoSolicitacao.ARRUMADA, orcamentoValor: 150,
        manutencaoDescricao: 'Substituição do cabo e limpeza do conector',
        manutencaoOrientacoes: 'Evitar puxar pelo cabo; mantenha limpo.',
        manutencaoData: h(32),
        historico: [
          { quando: h(34), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA, funcionario: 'Maria' },
          { quando: h(32), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA, funcionario: 'Maria' }
        ] },
      { id: uuid(), createdAt: h(31), clienteNome: 'Diego',    descricaoProduto: 'Monitor com imagem tremida', estado: EstadoSolicitacao.ARRUMADA, orcamentoValor: 330,
        manutencaoDescricao: 'Troca da fonte interna',
        manutencaoOrientacoes: 'Usar filtro de linha.',
        manutencaoData: h(31),
        historico: [
          { quando: h(33), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA, funcionario: 'Mário' },
          { quando: h(31), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA, funcionario: 'Mário' }
        ] },
  
      // --- PAGAS ---
      { id: uuid(), createdAt: h(24), clienteNome: 'Larissa',  descricaoProduto: 'Notebook sem bateria',       estado: EstadoSolicitacao.PAGA, orcamentoValor: 480,
        historico: [
          { quando: h(27), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA, funcionario: 'Maria' },
          { quando: h(25), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA, funcionario: 'Maria' },
          { quando: h(24), de: EstadoSolicitacao.ARRUMADA, para: EstadoSolicitacao.PAGA,     funcionario: 'Cliente' }
        ] },
      { id: uuid(), createdAt: h(23), clienteNome: 'Rafael',   descricaoProduto: 'Desktop com HD defeituoso',  estado: EstadoSolicitacao.PAGA, orcamentoValor: 700,
        historico: [
          { quando: h(26), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA, funcionario: 'Mário' },
          { quando: h(24), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA, funcionario: 'Mário' },
          { quando: h(23), de: EstadoSolicitacao.ARRUMADA, para: EstadoSolicitacao.PAGA,     funcionario: 'Cliente' }
        ] },
  
      // --- FINALIZADAS ---
      { id: uuid(), createdAt: h(12), clienteNome: 'Sofia',    descricaoProduto: 'Impressora sem conexão',     estado: EstadoSolicitacao.FINALIZADA, orcamentoValor: 210,
        historico: [
          { quando: h(16), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA,   funcionario: 'Maria' },
          { quando: h(14), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA,   funcionario: 'Maria' },
          { quando: h(13), de: EstadoSolicitacao.ARRUMADA, para: EstadoSolicitacao.PAGA,       funcionario: 'Cliente' },
          { quando: h(12), de: EstadoSolicitacao.PAGA,     para: EstadoSolicitacao.FINALIZADA, funcionario: 'Mário' }
        ] },
      { id: uuid(), createdAt: h(10), clienteNome: 'Tiago',    descricaoProduto: 'Notebook com teclado quebrado', estado: EstadoSolicitacao.FINALIZADA, orcamentoValor: 350,
        historico: [
          { quando: h(15), de: EstadoSolicitacao.ABERTA,   para: EstadoSolicitacao.APROVADA,   funcionario: 'Mário' },
          { quando: h(13), de: EstadoSolicitacao.APROVADA, para: EstadoSolicitacao.ARRUMADA,   funcionario: 'Mário' },
          { quando: h(12), de: EstadoSolicitacao.ARRUMADA, para: EstadoSolicitacao.PAGA,       funcionario: 'Cliente' },
          { quando: h(10), de: EstadoSolicitacao.PAGA,     para: EstadoSolicitacao.FINALIZADA, funcionario: 'Maria' }
        ] },
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

efetuarManutencao(
  id: string,
  dados: { descricao: string; orientacoes?: string },
  funcionario: { nome: string; email?: string }
): Observable<Solicitacao | undefined> {
  const list = this._solicitacoes$.value.slice();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return of(undefined);

  const nowIso = new Date().toISOString();
  const atual = { ...list[idx] };
  const de = atual.estado;

  atual.manutencaoDescricao = dados.descricao;
  atual.manutencaoOrientacoes = dados.orientacoes || '';
  atual.manutencaoData = nowIso;
  atual.estado = EstadoSolicitacao.ARRUMADA;

  atual.historico = [
    ...(atual.historico ?? []),
    { quando: nowIso, de, para: EstadoSolicitacao.ARRUMADA, funcionario: funcionario.nome }
  ];

  list[idx] = atual;
  this.saveAll(list);
  return of(atual);
}

redirecionarManutencao(
  id: string,
  destino: { nome: string; email: string; id?: string },
  funcionarioOrigem: { nome: string; email?: string }
): Observable<Solicitacao | undefined> {
  const list = this._solicitacoes$.value.slice();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return of(undefined);

  const nowIso = new Date().toISOString();
  const atual = { ...list[idx] };
  const de = atual.estado;

  atual.redirecionadaPara = destino;
  atual.estado = EstadoSolicitacao.REDIRECIONADA;

  atual.historico = [
    ...(atual.historico ?? []),
    {
      quando: nowIso,
      de,
      para: EstadoSolicitacao.REDIRECIONADA,
      funcionario: `${funcionarioOrigem.nome} → ${destino.nome}`
    }
  ];

  list[idx] = atual;
  this.saveAll(list);
  return of(atual);
}

finalizarSolicitacao(
  id: string,
  funcionario: { nome: string; email?: string }
): Observable<Solicitacao | undefined> {
  const list = this._solicitacoes$.value.slice();
  const idx = list.findIndex(s => s.id === id);
  if (idx === -1) return of(undefined);

  const atual = { ...list[idx] };
  if (atual.estado !== EstadoSolicitacao.PAGA) {
    return of(undefined);
  }

  const nowIso = new Date().toISOString();
  const de = atual.estado;

  atual.estado = EstadoSolicitacao.FINALIZADA;
  atual.finalizacaoData = nowIso;
  atual.historico = [
    ...(atual.historico ?? []),
    { quando: nowIso, de, para: EstadoSolicitacao.FINALIZADA, funcionario: funcionario.nome }
  ];

  list[idx] = atual;
  this.saveAll(list);
  return of(atual);
}

}
