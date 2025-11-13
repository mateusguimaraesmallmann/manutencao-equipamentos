import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { firstValueFrom, map, switchMap, take, shareReplay, Observable } from 'rxjs';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { FuncionarioSolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-funcionario-detalhe.dto';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { MatChip, MatChipsModule } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { TelefonePipe } from '../../../shared/pipes/telefone.pipe';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, 
    MatSelectModule, MatSnackBarModule, MatIcon, MatDivider, MatChipsModule, MatChipsModule, TelefonePipe ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private solicitacoesService = inject(SolicitacoesService);
  private funcionariosService = inject(FuncionariosService);
  private auth = inject(AutenticacaoService);

  solicitacao?: FuncionarioSolicitacaoDetalheDTO;
  form!: FormGroup;

  trackById = (_: number, f: { id: string }) => f.id;
  funcionarios$!: Observable<Funcionario[]>;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      orientacoes: ['', [Validators.required, Validators.maxLength(500)]],
      destino: [null as number | null]
    });

    firstValueFrom(
      this.solicitacoesService.buscarSolicitacaoFuncionarioPorId(id))
      .then(det => { this.solicitacao = det;})
      .catch(() => {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 2500 });
        this.router.navigate(['/funcionario']);
      });
    
    this.funcionarios$ = this.auth.user$.pipe(
      take(1),
      switchMap(user =>
        this.funcionariosService.refresh().pipe(
          map(l => (l ?? []).filter(f => f.email !== user?.email))
        )
      ),
      shareReplay(1)
    );
  }

  async salvarManutencao(): Promise<void> {
    if (!this.solicitacao) { return; }
    if (this.form.invalid) {
      this.snack.open('Preencha descrição e orientações (máx. 500).', 'OK', { duration: 2500 });
      return;
    }

    const { descricao, orientacoes } = this.form.value as { descricao: string; orientacoes: string };
    this.solicitacoesService.registrarManutencao(this.solicitacao.id, { descricao, orientacoes })
      .subscribe({
        next: () => {
          this.snack.open('Manutenção registrada', 'OK', { duration: 3000 });
          this.router.navigate(['/funcionario']);
        },
        error: (err) => {
          this.snack.open(err?.error?.message ?? 'Falha ao salvar manutenção.', 'OK', { duration: 3000 });
        }
      });
  }

  redirecionar(): void {
    if (!this.solicitacao) { return; }

    const destinoId = this.form.value.destino;
    if (!Number.isFinite(destinoId)) {
      this.snack.open('Selecione um funcionário de destino.', 'OK', { duration: 2500 });
      return;
    }

    this.solicitacoesService.redirecionar(this.solicitacao.id, destinoId).subscribe({
      next: () => {
        this.snack.open('Solicitacação redirecionada com sucesso.', 'OK', { duration: 3000 });
        this.router.navigate(['/funcionario']);
      },
      error: (err) => {
        console.error(err);
        this.snack.open(err, 'OK', { duration: 3500 });
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/funcionario']);
  }

}