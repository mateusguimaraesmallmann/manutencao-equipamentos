import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-mostrar-orcamento',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './mostrar-orcamento.component.html',
  styleUrl: './mostrar-orcamento.component.css'
})

export class MostrarOrcamentoComponent implements OnInit {
  solicitacao: any;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    this.solicitacao = solicitacoes.find((s: any, index: number) => index.toString() === id);
  }

  aprovar(): void {
    this.atualizarEstado('APROVADA');
    alert(`Serviço Aprovado no valor de R$ ${this.solicitacao.orcamento}`);
    this.router.navigate(['/pagina-cliente']);
  }

  rejeitar(): void {
    this.atualizarEstado('REJEITADA');
    alert('Serviço Rejeitado');
    this.router.navigate(['/pagina-cliente']);
  }

  atualizarEstado(novoEstado: string): void {
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    const id = this.route.snapshot.paramMap.get('id');
    solicitacoes[parseInt(id!)] = {
      ...this.solicitacao,
      estado: novoEstado,
      historico: [
        ...(this.solicitacao.historico || []),
        {
          data: new Date().toISOString(),
          acao: novoEstado
        }
      ]
    };
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));
  }
}
