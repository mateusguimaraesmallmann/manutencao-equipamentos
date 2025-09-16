import { Component, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { SolicitacoesService } from '../../services/solicitacoes.service';
import { Solicitacao, EstadoSolicitacao } from '../../shared/models/solicitacao.model';

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

import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-funcionario-inicial',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    TruncatePipe
  ],
  templateUrl: './funcionario-inicial.component.html',
  styleUrls: ['./funcionario-inicial.component.css']
})
export class FuncionarioInicialComponent {
  private service = inject(SolicitacoesService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);

  Estado = EstadoSolicitacao;

  filtros: FormGroup = this.fb.group({
    modo: ['TODAS' as 'TODAS' | 'HOJE' | 'PERIODO'],
    inicio: [null as Date | null],
    fim: [null as Date | null]
  });

  private todasSig: Signal<Solicitacao[]> = toSignal(this.service.solicitacoes$, { initialValue: [] });

  private filtrosSig = toSignal(
    this.filtros.valueChanges.pipe(startWith(this.filtros.value)),
    { initialValue: this.filtros.value }
  );

  private get meEmail(): string | undefined {
    try { return JSON.parse(localStorage.getItem('currentUser') || '{}')?.email; } catch { return undefined; }
  }

  visiveis: Signal<Solicitacao[]> = computed(() => {
    const list = this.todasSig();
    const { modo, inicio, fim } = this.filtrosSig() as {
      modo: 'TODAS' | 'HOJE' | 'PERIODO'; inicio: Date | null; fim: Date | null;
    };
    const me = this.meEmail;

    const startOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
    const endOf = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999).getTime();

    const today = new Date();

    const filtered = list.filter(s => {
      if (s.estado === EstadoSolicitacao.REDIRECIONADA) {
        if (!s.redirecionadaPara?.email || s.redirecionadaPara.email !== me) return false;
      }

      const ts = new Date(s.createdAt).getTime();

      if (modo === 'HOJE') {
        return ts >= startOf(today) && ts <= endOf(today);
      }

      if (modo === 'PERIODO') {
        if (inicio && ts < startOf(inicio)) return false;
        if (fim && ts > endOf(fim)) return false;
      }

      return true;
    });

    return filtered.sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  });

  displayedColumns = ['dataHora', 'cliente', 'descricao', 'estado', 'acao'];

  abrirOrcamento(s: Solicitacao) {
    this.router.navigate(['/orcamento', s.id]);
  }

  abrirManutencao(s: Solicitacao) {
    this.snack.open('Efetuar Manutenção (RF014) — em breve', 'OK', { duration: 2500 });
  }

  finalizarSolicitacao(s: Solicitacao) {
    this.snack.open('Finalizar Solicitação (RF016) — em breve', 'OK', { duration: 2500 });
  }

  estadoClass(e: EstadoSolicitacao): string {
    switch (e) {
      case EstadoSolicitacao.ABERTA:        return 'estado-chip aberta';
      case EstadoSolicitacao['ORCADA']:     return 'estado-chip orcada';
      case EstadoSolicitacao.REJEITADA:     return 'estado-chip rejeitada';
      case EstadoSolicitacao.APROVADA:      return 'estado-chip aprovada';
      case EstadoSolicitacao.REDIRECIONADA: return 'estado-chip redirecionada';
      case EstadoSolicitacao.ARRUMADA:      return 'estado-chip arrumada';
      case EstadoSolicitacao.PAGA:          return 'estado-chip paga';
      case EstadoSolicitacao.FINALIZADA:    return 'estado-chip finalizada';
      default: return 'estado-chip';
    }
  }

contagem = computed(() => {
  const list = this.visiveis();
  const c: Record<EstadoSolicitacao, number> = {
    [EstadoSolicitacao.ABERTA]: 0,
    [EstadoSolicitacao.ORCADA]: 0,
    [EstadoSolicitacao.REJEITADA]: 0,
    [EstadoSolicitacao.APROVADA]: 0,
    [EstadoSolicitacao.REDIRECIONADA]: 0,
    [EstadoSolicitacao.ARRUMADA]: 0,
    [EstadoSolicitacao.PAGA]: 0,
    [EstadoSolicitacao.FINALIZADA]: 0,
  };
  for (const s of list) c[s.estado]++;
  return c;
});

}