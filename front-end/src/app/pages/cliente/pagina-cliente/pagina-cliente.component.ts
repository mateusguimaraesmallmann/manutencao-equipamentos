import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SkeletonModule } from 'primeng/skeleton';

import { FormsModule } from '@angular/forms';

import { EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { SolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-cliente-resumo.dto';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    TableModule, ButtonModule, TagModule, TooltipModule, InputTextModule,
    ConfirmDialogModule, SkeletonModule,
    NavbarClienteComponent
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './pagina-cliente.component.html',
  styleUrls: ['./pagina-cliente.component.css']
})
export class ClienteComponent implements OnInit {

  solicitacoes: SolicitacaoResumoDTO[] = [];
  filtradas: SolicitacaoResumoDTO[] = [];

  Estado = EstadoSolicitacao;
  loading = false;

  constructor(
    private router: Router,
    private solicitacoesService: SolicitacoesService,
    private snack: MatSnackBar,
    private confirm: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  novaSolicitacao = () => this.router.navigate(['/solicitacao-manutencao']);

  carregarSolicitacoes() {
    this.solicitacoesService.listarSolicitacoesByCliente().subscribe({
      next: (res) => {
        this.solicitacoes = [...res];
        this.loading = false;
      },
      error: (err) => {
        console.error('Falha ao carregar solicitações do cliente', err);
        this.solicitacoes = [];
      }
    });
  }

  limitarDescricao(desc: string): string {
    return desc && desc.length > 30 ? desc.substring(0, 30) + '…' : (desc || '');
  }

  visualizarSolicitacao(id: number) {
    this.router.navigate(['/cliente/solicitacao', id]);
  }

  isOrcada(estado: EstadoSolicitacao | string): boolean {
    return estado === 'ORCADA';
  }

  isRejeitada(estado: EstadoSolicitacao | string): boolean {
    return estado === 'REJEITADA';
  }

  isArrumada(estado: EstadoSolicitacao | string): boolean {
    return estado === 'ARRUMADA';
  }

  mostrarVisualizar(estado: EstadoSolicitacao | string): boolean {
    return !['APROVADA', 'ORCADA', 'REJEITADA', 'ARRUMADA'].includes(estado);
  }

  mostrarOrcamento(id: number) {
    this.router.navigate(['/cliente/solicitacao', id]);
  }

  resgatarServico(id: number) {
    if (id == null) { return; }
    this.loading = true;
    this.solicitacoesService.resgatar(id).subscribe({
      next: () => {
        this.snack.open('Serviço resgatado com sucesso.', 'OK', { duration: 3000 });
        this.carregarSolicitacoes();
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
        this.snack.open('Falha ao resgatar serviço.', 'OK', { duration: 3500 });
      }
    });
  }

  pagarServico(id: number) {
    this.router.navigate(['/cliente/solicitacao', id]);
  }

  formatarEstado(estado: string): string {
    return estado?.charAt(0) + estado?.slice(1).toLowerCase();
  }

  mapSeverity(estado: string): 'success' | 'warning' | 'danger' | 'info' | 'secondary' {
    switch (estado) {
      case 'APROVADA':  return 'info';
      case 'ORCADA':    return 'warning';
      case 'REJEITADA': return 'danger';
      case 'ARRUMADA':  return 'success';
      default:          return 'secondary';
    }
  }

}