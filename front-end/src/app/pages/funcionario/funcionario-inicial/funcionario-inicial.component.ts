import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { Cliente } from '../../../shared/models/cliente.model';
import { NavbarFuncionarioComponent } from '../../../components/navbar-funcionario/navbar-funcionario.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TruncatePipe } from '../../../shared/pipes/truncate.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';
import { FuncionarioSolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-funcionario-resumo.dto';

@Component({
  selector: 'app-funcionario-inicial',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, TruncatePipe, NavbarFuncionarioComponent,
],
  templateUrl: './funcionario-inicial.component.html',
  styleUrls: ['./funcionario-inicial.component.css']
})
export class FuncionarioInicialComponent {
  private service = inject(SolicitacoesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  Estado = EstadoSolicitacao;
  displayedColumns = ['dataHora', 'cliente', 'descricao', 'estado', 'acao'];

  filtros: FormGroup = this.fb.group({
    modo: ['TODAS' as 'TODAS' | 'HOJE' | 'PERIODO'],
    inicio: [null as Date | null],
    fim: [null as Date | null]
  });

  data: FuncionarioSolicitacaoResumoDTO[] = [];

  ngOnInit(): void {
    this.service.listarSolicitacoesAbertas().subscribe({
      next: res => this.data = res,
      error: () => this.data = []
    });
  }

  desc30(s: string): string {
    return s?.length > 30 ? s.slice(0,30) + '…' : (s || '');
  }

  abrirOrcamento(row: FuncionarioSolicitacaoResumoDTO) {
    this.router.navigate(['/orcamento', row.id]);
  }

  estadoClass(e: EstadoSolicitacao | string): string {
    switch (e) {
      case EstadoSolicitacao.ABERTA: return 'estado-chip aberta';
      default: return 'estado-chip';
    }
  }

}