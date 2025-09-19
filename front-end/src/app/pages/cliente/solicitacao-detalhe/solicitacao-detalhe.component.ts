import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';

@Component({
  selector: 'app-solicitacao-detalhe',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTableModule
  ],
  templateUrl: './solicitacao-detalhe.component.html',
  styleUrls: ['./solicitacao-detalhe.component.css']
})
export class SolicitacaoDetalheComponent {
  Estado = EstadoSolicitacao;
  solicitacao?: Solicitacao;

  displayedColumns = ['quando', 'de', 'para', 'funcionario'];

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.solicitacao = this.getById(id);
  }

  private readAll(): Solicitacao[] {
    try { return JSON.parse(localStorage.getItem('solicitacoes') || '[]'); }
    catch { return []; }
  }
  private writeAll(list: Solicitacao[]) {
    localStorage.setItem('solicitacoes', JSON.stringify(list));
  }
  private getById(id: string): Solicitacao | undefined {
    return this.readAll().find(s => s.id === id);
  }

  voltar() {
    this.router.navigate(['/pagina-cliente']);
  }

  podeAprovarOuRejeitar(): boolean {
    return !!this.solicitacao && this.solicitacao.estado === EstadoSolicitacao.ORCADA;
  }
  podeResgatar(): boolean {
    return !!this.solicitacao && this.solicitacao.estado === EstadoSolicitacao.REJEITADA;
  }
  podePagar(): boolean {
    return !!this.solicitacao
      && this.solicitacao.estado === EstadoSolicitacao.ARRUMADA
      && this.solicitacao.orcamentoValor != null;
  }

  aprovar() {
    if (!this.solicitacao) return;
    if (this.solicitacao.orcamentoValor == null) {
      alert('Não há valor de orçamento definido.');
      return;
    }
    const all = this.readAll();
    const idx = all.findIndex(s => s.id === this.solicitacao!.id);
    if (idx === -1) return;

    const atual = { ...all[idx] };
    const de = atual.estado;
    const agora = new Date().toISOString();

    atual.estado = EstadoSolicitacao.APROVADA;
    atual.historico = [...(atual.historico ?? []), { quando: agora, de, para: EstadoSolicitacao.APROVADA }];

    all[idx] = atual;
    this.writeAll(all);

    alert(`Serviço Aprovado no Valor R$ ${Number(atual.orcamentoValor).toFixed(2)}`);
    this.router.navigate(['/pagina-cliente']);
  }

  rejeitar() {
    if (!this.solicitacao) return;

    const motivo = (prompt('Informe o motivo da rejeição:') || '').trim();
    const all = this.readAll();
    const idx = all.findIndex(s => s.id === this.solicitacao!.id);
    if (idx === -1) return;

    const atual = { ...all[idx] };
    const de = atual.estado;
    const agora = new Date().toISOString();

    atual.estado = EstadoSolicitacao.REJEITADA;
    (atual as any).motivoRejeicao = motivo || 'Sem motivo informado';
    atual.historico = [...(atual.historico ?? []), { quando: agora, de, para: EstadoSolicitacao.REJEITADA }];

    all[idx] = atual;
    this.writeAll(all);

    alert('Serviço Rejeitado');
    this.router.navigate(['/pagina-cliente']);
  }

  resgatar() {
    if (!this.solicitacao || this.solicitacao.estado !== EstadoSolicitacao.REJEITADA) return;
  
    const all = this.readAll();
    const idx = all.findIndex(s => s.id === this.solicitacao!.id);
    if (idx === -1) return;
  
    const atual = { ...all[idx] };
    const de = atual.estado;
    const agora = new Date().toISOString();
  
    atual.estado = EstadoSolicitacao.APROVADA;
    atual.historico = [
      ...(atual.historico ?? []),
      {
        quando: agora,
        de,
        para: EstadoSolicitacao.APROVADA,
        funcionario: 'Cliente'
      }
    ];
  
    all[idx] = atual;
    this.writeAll(all);
  
    alert('Serviço resgatado para APROVADA.');
    this.router.navigate(['/pagina-cliente']);
  }
  
  pagar() {
    if (!this.solicitacao) return;
    if (this.solicitacao.estado !== EstadoSolicitacao.ARRUMADA) return;
    if (this.solicitacao.orcamentoValor == null) {
      alert('Não há valor para pagamento.');
      return;
    }
  
    const confirmar = confirm(
      `Confirmar pagamento no valor de R$ ${Number(this.solicitacao.orcamentoValor).toFixed(2)}?`
    );
    if (!confirmar) return;
  
    const all = this.readAll();
    const idx = all.findIndex(s => s.id === this.solicitacao!.id);
    if (idx === -1) return;
  
    const atual = { ...all[idx] };
    const de = atual.estado;
    const agora = new Date().toISOString();
  
    atual.estado = EstadoSolicitacao.PAGA;
    (atual as any).pagaEm = agora; // opcional para exibir depois
    atual.historico = [
      ...(atual.historico ?? []),
      { quando: agora, de, para: EstadoSolicitacao.PAGA, funcionario: 'Cliente' }
    ];
  
    all[idx] = atual;
    this.writeAll(all);
  
    alert('Pagamento confirmado. Obrigado!');
    this.router.navigate(['/pagina-cliente']);
  }
  
}

