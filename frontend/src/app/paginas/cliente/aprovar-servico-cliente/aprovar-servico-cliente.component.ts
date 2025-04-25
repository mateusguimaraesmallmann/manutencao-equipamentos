import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aprovar-servico-cliente',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aprovar-servico-cliente.component.html',
  styleUrls: ['./aprovar-servico-cliente.component.css']
})
export class AprovarServicoClienteComponent {
  valorOrcamento: number = 680.00;

  constructor(private router: Router) {}

  confirmarAprovacao() {
    alert(`Serviço Aprovado no valor de R$ ${this.valorOrcamento.toFixed(2)}`);
    this.router.navigate(['/cliente']);
  }

  cancelar() {
    this.router.navigate(['/cliente']);
  }
}
