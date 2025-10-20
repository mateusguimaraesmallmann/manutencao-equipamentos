import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

import { Solicitacao, EstadoSolicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-detalhe-dto';
import { SolicitacoesService } from '../../../services/solicitacoes.service';

@Component({
  selector: 'app-solicitacao-detalhe',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatDividerModule, MatTableModule ],
  templateUrl: './solicitacao-detalhe.component.html',
  styleUrls: ['./solicitacao-detalhe.component.css']
})
export class SolicitacaoDetalheComponent {
  Estado = EstadoSolicitacao;
  solicitacao?: SolicitacaoDetalheDTO;

  displayedColumns = ['quando', 'de', 'para', 'funcionario'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacoesService: SolicitacoesService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      this.voltar();
      return;
    }

    this.solicitacoesService.buscarPorId(id).subscribe({
      next: (s) => this.solicitacao = s,
      error: () => this.solicitacao = undefined
    });
  }

  voltar() {
    this.router.navigate(['/pagina-cliente']);
  }
  
}