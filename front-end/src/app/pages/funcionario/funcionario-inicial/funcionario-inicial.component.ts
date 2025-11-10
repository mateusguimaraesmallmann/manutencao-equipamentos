import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { SolicitacoesService } from '../../../services/solicitacoes.service';
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
import { FuncionarioSolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-funcionario-resumo.dto';
import { EstadoSolicitacao } from '../../../shared';

@Component({
  selector: 'app-funcionario-inicial',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, MatButtonToggleModule,
    MatDatepickerModule, MatNativeDateModule, MatSnackBarModule, MatFormFieldModule, MatInputModule, NavbarFuncionarioComponent,
],
  templateUrl: './funcionario-inicial.component.html',
  styleUrls: ['./funcionario-inicial.component.css']
})
export class FuncionarioInicialComponent {
  private service = inject(SolicitacoesService);
  private router = inject(Router);

  Estado = EstadoSolicitacao;
  displayedColumns = ['dataHora', 'cliente', 'descricao', 'estado', 'acao'];

  data: FuncionarioSolicitacaoResumoDTO[] = [];

  ngOnInit(): void {
    this.listAll();
    this.applyFilters();
    this.filtros.valueChanges.subscribe(() => this.applyFilters());

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

  private applyFilters(): void {
  const { modo, inicio, fim } = this.filtros.value;

    if (modo === 'TODAS') {
      this.listAll();
      return;
  }

  if (modo === 'HOJE') {
    const from = startOfToday();
    const to = endOfToday();
    this.data = this.data.filter(s => between(parseDate(s.createdAt), from, to));
    return;
  }

  // PERÍODO
  if (inicio || fim) {
    const i = inicio ? startOfDay(new Date(inicio)) : new Date(0);
    const f = fim ? endOfDay(new Date(fim)) : endOfDay(new Date(inicio));
    const [from, to] = i <= f ? [i, f] : [f, i];
    this.data = this.data.filter(s => between(parseDate(s.createdAt), from, to));
  } else {
    this.data = [];
  }
}

  listAll() {
      this.service.listarSolicitacoesAbertas().subscribe({
      next: res => this.data = res,
      error: () => this.data = []
    });
}
}

function parseDate(d: string | Date): Date {
  return d instanceof Date ? d : new Date(d);
}
function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function startOfToday(): Date {
  return startOfDay(new Date());
}
function endOfToday(): Date {
  return endOfDay(new Date());
}
function between(date: Date, from: Date, to: Date): boolean {
  const t = date.getTime();
  return t >= from.getTime() && t <= to.getTime();
}
