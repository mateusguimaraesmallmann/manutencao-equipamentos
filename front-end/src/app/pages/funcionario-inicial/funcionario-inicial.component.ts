import { Component, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitacoesService } from '../../services/solicitacoes.service';
import { Solicitacao, EstadoSolicitacao } from '../../shared/models/solicitacao.model';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-funcionario-inicial',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    TruncatePipe
  ],
  templateUrl: './funcionario-inicial.component.html',
  styleUrls: ['./funcionario-inicial.component.css']
})
export class FuncionarioInicialComponent {
  private service = inject(SolicitacoesService);
  private router = inject(Router);

  private all$ = this.service.listAbertasOrdenadas().pipe(
    map(list =>
      list
        .filter(s => s.estado === EstadoSolicitacao.ABERTA)
        .sort((a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    )
  );
  abertas: Signal<Solicitacao[]> = toSignal(this.all$, { initialValue: [] });

  displayedColumns = ['dataHora', 'cliente', 'descricao', 'acao'];
  
}
