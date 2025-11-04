import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ButtonModule, ButtonSeverity } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { NavbarClienteComponent } from '../../../components/navbar-cliente/navbar-cliente.component';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { SolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-cliente-resumo.dto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TagModule } from "primeng/tag";

@Component({
  selector: 'app-pagina-cliente',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, NavbarClienteComponent, TagModule], 
  templateUrl: './pagina-cliente.component.html',
  styleUrls: ['./pagina-cliente.component.css']
})
export class ClienteComponent implements OnInit {

  solicitacoes: SolicitacaoResumoDTO[] = [];
  Estado = EstadoSolicitacao;

  constructor(private router: Router, private solicitacoesService: SolicitacoesService, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.carregarSolicitacoes();
  }

  novaSolicitacao = () => this.router.navigate(['/solicitacao-manutencao'])

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
    this.solicitacoesService.resgatar(id).subscribe({
      next: () => {
        this.snack.open('Serviço resgatado com sucesso.', 'OK', { duration: 3000 });
        this.carregarSolicitacoes();
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Falha ao resgatar serviço.', 'OK', { duration: 3500 });
      }
    });
  }

  pagarServico(id: number) {
    this.router.navigate(['/cliente/solicitacao', id]);
  }

}