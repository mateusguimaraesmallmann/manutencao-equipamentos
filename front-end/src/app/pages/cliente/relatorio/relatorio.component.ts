import { Component } from '@angular/core';
import { DatePipe, NgFor } from '@angular/common';


@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  imports: [DatePipe],
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioTesteComponent {


  mensagem: string = 'Página de Relatório teste';


  dataAtual: Date = new Date();


  dados: string[] = [
    'Máquina 01 - Ativa',
    'Máquina 02 - Em manutenção',
    'Máquina 03 - Aguardando peças',
    'Máquina 04 - Operando normalmente',
    'Máquina 05 - Revisão agendada'
  ];


  atualizarData(): void {
    this.dataAtual = new Date();
  }


  adicionarItem(): void {
    this.dados.push('Novo item adicionado em ' + this.dataAtual.toLocaleTimeString());
  }


  limpar(): void {
    this.dados = [];
  }
}