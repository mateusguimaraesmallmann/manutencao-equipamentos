import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import { NavbarFuncionarioComponent } from '../../../components/navbar-funcionario/navbar-funcionario.component';

import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { FuncionarioSolicitacaoResumoDTO } from '../../../shared/dtos/solicitacao-funcionario-resumo.dto';
import { EstadoSolicitacao } from '../../../shared';
import { take } from 'rxjs';

type FiltroModo = 'HOJE' | 'PERIODO' | 'TODAS';

@Component({
  selector: 'app-consultar-solicitacoes',
    imports: [ CommonModule, ReactiveFormsModule, MatSnackBarModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, 
    MatNativeDateModule, MatButtonModule, TableModule, ButtonModule, NavbarFuncionarioComponent ],
  templateUrl: './consultar-solicitacoes.component.html',
  styleUrl: './consultar-solicitacoes.component.css'
})
export class ConsultarSolicitacoesComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snack = inject(MatSnackBar);
  private solicitacoesService = inject(SolicitacoesService);
  private auth = inject(AutenticacaoService);

  displayedColumns = ['dataHora', 'cliente', 'descricao', 'estado', 'acao'];
  solicitacoes: FuncionarioSolicitacaoResumoDTO[] = [];

  filtroForm = this.fb.group({
    modo: ['TODAS' as FiltroModo, Validators.required],
    inicio: [null as Date | null],
    fim: [null as Date | null],
  });

  ngOnInit(): void {
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    const { modo, inicio, fim } = this.filtroForm.value;

    const params: any = {};
    if (modo === 'HOJE') {
      params.modo = 'HOJE';
    } else if (modo === 'PERIODO' && inicio && fim) {
      params.modo = 'PERIODO';
      params.inicio = this.toDateOnlyISO(inicio);
      params.fim = this.toDateOnlyISO(fim);
    } else {
      params.modo = 'TODAS';
    }

    this.auth.user$.pipe(take(1)).subscribe(user => {
      this.solicitacoesService.listarSolicitacoesFuncionario(params).subscribe({
        next: (lista) => {
          let res = [...(lista || [])];

          res.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

          const meuId = user?.id ? Number(user.id) : null;
          res = res.filter(s => this.passaRegraRedirecionada(s, meuId));

          this.solicitacoes = res;
        },
        error: (err) => {
          console.error(err);
          this.solicitacoes = [];
          this.snack.open('Falha ao carregar solicitações.', 'OK', { duration: 3000 });
        }
      });
    });
  }

 private passaRegraRedirecionada(s: FuncionarioSolicitacaoResumoDTO, meuId: number | null): boolean {
    if (s.estado !== 'REDIRECIONADA') { return true; }
    if (meuId == null) { return false; }
    return Number((s as any).responsavelAtualId) === meuId;
  }

  limparFiltro(): void {
    this.filtroForm.patchValue({ modo: 'TODAS', inicio: null, fim: null });
    this.aplicarFiltro();
  }

  efetuarOrcamento(id: number) { 
    this.router.navigate(['/efetuar-orcamento', id]); 
  }

  efetuarManutencao(id: number) { 
    this.router.navigate(['/manutencao', id]); 
  }
  
  finalizarSolicitacao(id: number) { 
    this.router.navigate(['/finalizar-solicitacao', id]); 
  }
  
  visualizar(id: number) { 
    this.router.navigate(['/funcionario/solicitacao/', id]); 
  }

  limitarDescricao(desc: string): string {
    return desc && desc.length > 30 ? desc.substring(0, 30) + '…' : (desc || '');
  }

  private toDateOnlyISO(d: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  isAberta(estado: EstadoSolicitacao | string) { 
    return estado === 'ABERTA'; 
  }
  
  isAprovada(estado: EstadoSolicitacao | string) { 
    return estado === 'APROVADA'; 
  }
  
  isRedirecionada(estado: EstadoSolicitacao | string) { 
    return estado === 'REDIRECIONADA'; 
  }
  
  isPaga(estado: EstadoSolicitacao | string) { 
    return estado === 'PAGA'; 
  }
  
  mostrarVisualizar(estado: EstadoSolicitacao | string) {
    return !['ABERTA', 'APROVADA', 'REDIRECIONADA', 'PAGA', 'FINALIZADA'].includes(estado);
  }
 
}