import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { SolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-resumo.dto';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, NavbarClienteComponent ], 
  templateUrl: './pagina-cliente.component.html',
  styleUrls: ['./pagina-cliente.component.css']
})
export class ClienteComponent implements OnInit {

  solicitacoes: SolicitacaoResumoDTO[] = [];
  Estado = EstadoSolicitacao;

  constructor(private router: Router, private solicitacoesService: SolicitacoesService) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  novaSolicitacao() {
    this.router.navigate(['/solicitacao-manutencao']);
  }

  private carregarSolicitacoes() {
    this.solicitacoesService.listarSolicitacoesByCliente().subscribe({
      next: (res) => {
        this.solicitacoes = [...res];
      },
      error: (err) => {
        console.error('Falha ao carregar solicitações do cliente', err);
        this.solicitacoes = [];
      }
    });
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

}