import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { NavbarFuncionarioComponent } from '../../../components/navbar-funcionario/navbar-funcionario.component';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';
import { LinhaCategoria, LinhaDia, RelatorioService } from '../../../services/relatorio.service';

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NavbarFuncionarioComponent
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private relatorioService = inject(RelatorioService);

  filtros: FormGroup = this.fb.group({
    inicio: [null as Date | null],
    fim: [null as Date | null]
  });

  displayedColumnsDia = ['dia', 'total'];
  displayedColumnsCat = ['categoria', 'total'];

  linhasDia = signal<LinhaDia[]>([]);
  linhasCategoria = signal<LinhaCategoria[]>([]);

  ngOnInit(): void {
    this.carregarReceitasPorDia();
    this.carregarReceitasPorCategoria();

    this.filtros.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.carregarReceitasPorDia();
      });
  }

  private carregarReceitasPorDia(): void {
    const { inicio, fim } = this.filtros.value as { inicio: Date | null; fim: Date | null };

    const inicioStr = inicio ? this.toDateParam(inicio) : undefined;
    const fimStr = fim ? this.toDateParam(fim) : undefined;

    this.relatorioService.obterReceitasPorDia(inicioStr, fimStr)
      .subscribe({
        next: (linhas) => this.linhasDia.set(linhas || []),
        error: (err) => {
          console.error('Erro ao carregar receitas por dia', err);
          this.linhasDia.set([]);
        }
      });
  }

  private carregarReceitasPorCategoria(): void {
    this.relatorioService.obterReceitasPorCategoria()
      .subscribe({
        next: (linhas) => this.linhasCategoria.set(linhas || []),
        error: (err) => {
          console.error('Erro ao carregar receitas por categoria', err);
          this.linhasCategoria.set([]);
        }
      });
  }

  private toDateParam(d: Date): string {
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
  }

  private fmtDia(iso: string): string {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(d);
  }

  private fmtMoeda(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  totalDia(): number {
    return this.linhasDia().reduce((acc, l) => acc + (l.total || 0), 0);
  }

  totalCategoria(): number {
    return this.linhasCategoria().reduce((acc, l) => acc + (l.total || 0), 0);
  }

  gerarPdfReceitasPorDia(): void {
    const doc = new jsPDF();
    const { inicio, fim } = this.filtros.value as { inicio: Date | null; fim: Date | null };

    const periodo =
      (inicio ? `de ${this.fmtDia(inicio.toISOString())}` : 'desde o início') +
      ' ' +
      (fim ? `até ${this.fmtDia(fim.toISOString())}` : 'até hoje');

    doc.setFontSize(14);
    doc.text('Relatório de Receitas por Dia', 14, 16);
    doc.setFontSize(10);
    doc.text(periodo, 14, 22);

    const rows = this.linhasDia().map(l => [l.dia, this.fmtMoeda(l.total)]);

    autoTable(doc, {
      head: [['Dia', 'Total']],
      body: rows,
      startY: 28,
      styles: { fontSize: 10 },
      foot: [['TOTAL', this.fmtMoeda(this.totalDia())]]
    });

    doc.save('relatorio-receitas-por-dia.pdf');
  }

  gerarPdfReceitasPorCategoria(): void {
    const doc = new jsPDF();

    doc.setFontSize(14);
    doc.text('Relatório de Receitas por Categoria (desde sempre)', 14, 16);

    const rows = this.linhasCategoria().map(l => [l.categoria, this.fmtMoeda(l.total)]);

    autoTable(doc, {
      head: [['Categoria', 'Total']],
      body: rows,
      startY: 24,
      styles: { fontSize: 10 },
      foot: [['TOTAL', this.fmtMoeda(this.totalCategoria())]]
    });

    doc.save('relatorio-receitas-por-categoria.pdf');
  }

  voltar(): void {
    this.router.navigate(['/funcionario']);
  }

}