import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]  
})
export class RelatorioReceitasComponent {
  dataInicial!: string;
  dataFinal!: string;
  receitas: { data: string; valor: number }[] = [];

  gerarRelatorio() {
    const dadosMock = [
      { data: '2025-05-01', valor: 500 },
      { data: '2025-05-02', valor: 700 },
      { data: '2025-05-03', valor: 400 }
    ];
    this.receitas = dadosMock.filter(r => r.data >= this.dataInicial && r.data <= this.dataFinal);
  }

  baixarPdf() {
    window.print();
  }
}
