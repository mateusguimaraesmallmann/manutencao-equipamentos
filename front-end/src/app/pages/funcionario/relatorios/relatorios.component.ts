import { Component, computed, inject } from '@angular/core';
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

type LinhaDia = { dia: string; total: number };
type LinhaCategoria = { categoria: string; total: number };

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
    NavbarFuncionarioComponent
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  filtros: FormGroup = this.fb.group({
    inicio: [null as Date | null],
    fim: [null as Date | null]
  });

  displayedColumnsDia = ['dia', 'total'];
  displayedColumnsCat = ['categoria', 'total'];

  private readAllSolicitacoes(): Solicitacao[] {
    try { return JSON.parse(localStorage.getItem('solicitacoes') || '[]'); }
    catch { return []; }
  }

  private readCategoriasIndex(): Record<string, string> {
    try {
      const arr = JSON.parse(localStorage.getItem('categorias_equipamento') || '[]') as Array<{id?: string; nome?: string; ativo?: boolean}>;
      const idx: Record<string, string> = {};
      for (const c of arr || []) {
        if (c?.id && c?.nome) idx[c.id] = c.nome;
      }
      return idx;
    } catch {
      return {};
    }
  }

  private pagas(): Solicitacao[] {
    return this.readAllSolicitacoes().filter(s => s.estado === EstadoSolicitacao.PAGA && (s.orcamentoValor ?? null) != null);
  }

  private categoriaNomeDe(s: Solicitacao): string {
    const nomeDireto = (s as any).categoria;
    if (typeof nomeDireto === 'string' && nomeDireto.trim()) return nomeDireto.trim();

    const catId = (s as any).categoriaId;
    if (typeof catId === 'string' && catId.trim()) {
      const idx = this.readCategoriasIndex();
      if (idx[catId]) return idx[catId];
    }
    return 'Sem categoria';
  }

  private receitaDateIso(s: Solicitacao): string {
    return (s.pagaEm || s.createdAt);
  }

  private fmtDia(iso: string): string {
    const d = new Date(iso);
    return new Intl.DateTimeFormat('pt-BR', { timeZone: 'America/Sao_Paulo' }).format(d);
  }
  private fmtMoeda(v: number): string {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);
  }

  linhasDia = computed<LinhaDia[]>(() => {
    const { inicio, fim } = this.filtros.value as { inicio: Date | null; fim: Date | null };
    const startMs = inicio ? new Date(inicio.getFullYear(), inicio.getMonth(), inicio.getDate(), 0,0,0,0).getTime() : -Infinity;
    const endMs   = fim    ? new Date(fim.getFullYear(), fim.getMonth(), fim.getDate(), 23,59,59,999).getTime()  : +Infinity;

    const map = new Map<string, number>();
    for (const s of this.pagas()) {
      const t = new Date(this.receitaDateIso(s)).getTime();
      if (t < startMs || t > endMs) continue;
      const dia = this.fmtDia(this.receitaDateIso(s));
      const val = Number(s.orcamentoValor || 0);
      map.set(dia, (map.get(dia) || 0) + val);
    }
    const arr: LinhaDia[] = Array.from(map.entries()).map(([dia, total]) => ({ dia, total }));
    arr.sort((a,b) => {
      const [da, ma, aa] = a.dia.split('/').map(Number);
      const [db, mb, ab] = b.dia.split('/').map(Number);
      return new Date(aa, ma-1, da).getTime() - new Date(ab, mb-1, db).getTime();
    });
    return arr;
  });

  linhasCategoria = computed<LinhaCategoria[]>(() => {
    const map = new Map<string, number>();
    for (const s of this.pagas()) {
      const nome = this.categoriaNomeDe(s);
      const val = Number(s.orcamentoValor || 0);
      map.set(nome, (map.get(nome) || 0) + val);
    }
    const arr: LinhaCategoria[] = Array.from(map.entries()).map(([categoria, total]) => ({ categoria, total }));
    arr.sort((a,b) => b.total - a.total);
    return arr;
  });

  totalDia(): number {
    return this.linhasDia().reduce((acc, l) => acc + l.total, 0);
  }
  totalCategoria(): number {
    return this.linhasCategoria().reduce((acc, l) => acc + l.total, 0);
  }

  gerarPdfReceitasPorDia() {
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

  gerarPdfReceitasPorCategoria() {
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

  voltar() {
    this.router.navigate(['/funcionario']);
  }
}