import { Component } from '@angular/core';

@Component({
  selector: 'app-relatorio-receitas',
  templateUrl: './relatorio-receitas.component.html',
  styleUrls: ['./relatorio-receitas.component.css']
})
export class RelatorioReceitasComponent {
  dataInicial!: string;
  dataFinal!: string;
  receitas: { data: string; valor: number }[] = [];

  // Função chamada ao enviar o formulário
  gerarRelatorio() {
    // Simule dados (depois troque pelo service real)
    const dadosMock = [
      { data: '2025-05-01', valor: 500 },
      { data: '2025-05-02', valor: 700 },
      { data: '2025-05-03', valor: 400 }
    ];

    // Filtra conforme datas escolhidas
    this.receitas = dadosMock.filter(r => r.data >= this.dataInicial && r.data <= this.dataFinal);
  }

  baixarPdf() {
    // Simples: usa o print do navegador (pode turbinar depois)
    window.print();
  }
}
