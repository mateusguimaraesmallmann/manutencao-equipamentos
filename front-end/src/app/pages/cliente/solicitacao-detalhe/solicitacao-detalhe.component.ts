import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

import { EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-cliente-detalhe-dto';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

import { AutenticacaoService } from '../../../services/autenticacao.service';

@Component({
  selector: 'app-solicitacao-detalhe',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTableModule, MatChipsModule, ],
  templateUrl: './solicitacao-detalhe.component.html',
  styleUrls: ['./solicitacao-detalhe.component.css']
})
export class SolicitacaoDetalheComponent {
  Estado = EstadoSolicitacao;
  solicitacao?: SolicitacaoDetalheDTO;

  displayedColumns = ['quando', 'de', 'para', 'funcionario'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacoesService: SolicitacoesService,
    private snack: MatSnackBar,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      this.voltar();
      return;
    }

    this.solicitacoesService.buscarSolicitacaoClientePorId(id).subscribe({
      next: (s) => this.solicitacao = s,
      error: () => this.solicitacao = undefined
    });
  }

  voltar() {
    const user = this.autenticacaoService['_user'].value;
    if(user?.perfil === 'CLIENTE'){
      this.router.navigate(['/pagina-cliente']);
    } else {
      this.router.navigate(['/consultar-solicitacoes']);
    }
  }

  podeAprovarOuRejeitar(): boolean {
    const user = this.autenticacaoService['_user'].value;
        if(user?.perfil === 'CLIENTE' && this.solicitacao?.estado === 'ORCADA'){
      return true;
    } else {
      return false;
    }
  }

  podePagar(): boolean {
    const user = this.autenticacaoService['_user'].value;
    if(user?.perfil === 'CLIENTE' && this.solicitacao?.estado === 'ARRUMADA'){
      return true;
    } else {
      return false;
    }
  }

  podeFinalizar(): boolean {
    const user = this.autenticacaoService['_user'].value;
    if(user?.perfil === 'FUNCIONARIO' && this.solicitacao?.estado === 'PAGA'){
      return true;
    } else {
      return false;
    }
  }

  finalizar(): void {
    if (!this.solicitacao) { return; }
    this.solicitacoesService.finalizar(this.solicitacao.id).subscribe({
      next: () => {
        this.snack.open('Serviço finalizado com sucesso.', 'OK', { duration: 3000 });
        this.router.navigate(['/consultar-solicitacoes']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Falha ao finalizar serviço.', 'OK', { duration: 3500 });
      }
    });
  }

  aprovar(): void {
    if (!this.solicitacao) { return; }
    this.solicitacoesService.aprovar(this.solicitacao.id).subscribe({
      next: () => {
        this.snack.open('Serviço aprovado no Valor R$ ' + this.solicitacao?.orcamentoValor, 'OK', { duration: 3000 });
        this.router.navigate(['/pagina-cliente']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Falha ao aprovar serviço.', 'OK', { duration: 3500 });
      }
    });
  }

  rejeitar(): void {
    if (!this.solicitacao) { return; }
    this.solicitacoesService.rejeitar(this.solicitacao!.id).subscribe({
      next: () => {
        this.snack.open('Serviço rejeitado.', 'OK', { duration: 3000 });
        this.router.navigate(['/pagina-cliente']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Falha ao rejeitar serviço.', 'OK', { duration: 3500 });
      }
    });
  }

  pagar(){
    if (!this.solicitacao) { return; }
    this.solicitacoesService.pagar(this.solicitacao!.id).subscribe({
      next: () => {
        this.snack.open('Serviço pago.', 'OK', { duration: 3000 });
        this.router.navigate(['/pagina-cliente']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open('Falha ao pagar serviço.', 'OK', { duration: 3500 });
      }
    });
  }
  
}