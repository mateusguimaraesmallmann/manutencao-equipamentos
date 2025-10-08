import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, 
            TableModule, 
            ButtonModule,
            NavbarClienteComponent],
  templateUrl: './pagina-cliente.component.html',
  styleUrls: ['./pagina-cliente.component.css']
})
export class ClienteComponent implements OnInit {

  solicitacoes: Solicitacao[] = [];
  Estado = EstadoSolicitacao;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.carregarMinhasSolicitacoes();
  }

  novaSolicitacao() {
    this.router.navigate(['/solicitacao-manutencao']);
  }

  private carregarMinhasSolicitacoes() {
    const user = this.getCurrentUser();
    const email = (user?.email || '').toLowerCase();
    if (!email) {
      this.solicitacoes = [];
      return;
    }
  
    const all: Solicitacao[] = this.readAllSolicitacoes();
    this.solicitacoes = all
      .filter(s => (s.clienteEmail || '').toLowerCase() === email)   // <- filtro estrito por e-mail
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  private getCurrentUser(): { email?: string; nome?: string } | null {
    try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); }
    catch { return null; }
  }
  
  private readAllSolicitacoes(): Solicitacao[] {
    try { return JSON.parse(localStorage.getItem('solicitacoes') || '[]'); }
    catch { return []; }
  }

  private writeAllSolicitacoes(list: Solicitacao[]) {
    localStorage.setItem('solicitacoes', JSON.stringify(list));
  }

  private isDoCliente(s: Solicitacao, email?: string | null): boolean {
    // return (s as any)?.cliente?.email?.toLowerCase?.() === (email || '').toLowerCase();
    return true;
  }

  limitarDescricao(desc: string): string {
    return desc && desc.length > 30 ? desc.substring(0, 30) + '…' : (desc || '');
  }

  getAcaoBotao(estado: EstadoSolicitacao | string): string {
    switch (estado) {
      case 'ORÇADA':
      case EstadoSolicitacao.ORCADA: return 'Aprovar/Rejeitar Serviço';
      case EstadoSolicitacao.REJEITADA: return 'Resgatar Serviço';
      case EstadoSolicitacao.ARRUMADA:  return 'Pagar Serviço';
      default: return '';
    }
  }

  visualizarSolicitacao(id: string) {
  this.router.navigate(['/cliente/solicitacao', id]);
}

  aprovarOuRejeitar(s: Solicitacao) {
    const all = this.readAllSolicitacoes();
    const idx = all.findIndex(x => x.id === s.id);
    if (idx === -1) return;

    const atual = { ...all[idx] };
    const nowIso = new Date().toISOString();

    const aprovar = confirm('Deseja APROVAR o orçamento? (Cancelar = Rejeitar)');
    if (aprovar) {
      const de = atual.estado;
      atual.estado = EstadoSolicitacao.APROVADA;
      atual.historico = [...(atual.historico ?? []), { quando: nowIso, de, para: EstadoSolicitacao.APROVADA }];
      all[idx] = atual;
      this.writeAllSolicitacoes(all);
      this.syncAtualizacao(atual);
      alert('Serviço Aprovado.');
      return;
    }

    const motivo = prompt('Informe o motivo da rejeição:') || 'Sem motivo informado';
    const de = atual.estado;
    atual.estado = EstadoSolicitacao.REJEITADA;
    atual.historico = [...(atual.historico ?? []), { quando: nowIso, de, para: EstadoSolicitacao.REJEITADA }];
    (atual as any).motivoRejeicao = motivo;

    all[idx] = atual;
    this.writeAllSolicitacoes(all);
    this.syncAtualizacao(atual);
    alert('Serviço Rejeitado.');
  }

  resgatarServico(s: Solicitacao) {
    const all = this.readAllSolicitacoes();
    const idx = all.findIndex(x => x.id === s.id);
    if (idx === -1) return;

    const atual = { ...all[idx] };
    const nowIso = new Date().toISOString();
    const de = atual.estado;

    atual.estado = EstadoSolicitacao.APROVADA;
    atual.historico = [...(atual.historico ?? []), { quando: nowIso, de, para: EstadoSolicitacao.APROVADA }];

    all[idx] = atual;
    this.writeAllSolicitacoes(all);
    this.syncAtualizacao(atual);

    alert('Serviço resgatado para APROVADA.');
  }

  pagarServico(s: Solicitacao) {
    const all = this.readAllSolicitacoes();
    const idx = all.findIndex(x => x.id === s.id);
    if (idx === -1) return;

    const atual = { ...all[idx] };
    const nowIso = new Date().toISOString();
    const de = atual.estado;

    atual.estado = EstadoSolicitacao.PAGA;
    (atual as any).pagaEm = nowIso;
    atual.historico = [...(atual.historico ?? []), { quando: nowIso, de, para: EstadoSolicitacao.PAGA }];

    all[idx] = atual;
    this.writeAllSolicitacoes(all);
    this.syncAtualizacao(atual);

    alert('Pagamento confirmado. Obrigado!');
  }

  private syncAtualizacao(updated: Solicitacao) {
    const i = this.solicitacoes.findIndex(x => x.id === updated.id);
    if (i >= 0) {
      this.solicitacoes[i] = updated;
      this.solicitacoes = this.solicitacoes
        .slice()
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    }
  }
}


