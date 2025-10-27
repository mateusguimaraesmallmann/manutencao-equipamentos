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
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { finalize, firstValueFrom, combineLatest, map, of, switchMap } from 'rxjs';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { AutenticacaoService } from '../../../services/autenticacao.service';
import { FuncionarioSolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-funcionario-detalhe.dto';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatSnackBarModule ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private solicitacoes = inject(SolicitacoesService);
  private funcionariosSrv = inject(FuncionariosService);
  private auth = inject(AutenticacaoService);

  solicitacao?: FuncionarioSolicitacaoDetalheDTO;
  form!: FormGroup;

  trackById = (_: number, f: { id: string }) => f.id;

  funcionarios$ = combineLatest([this.funcionariosSrv.funcionarios$, this.auth.user$]).pipe(
    map(([lista, user]) => {
      if (!user) { return []; }
      return (lista || []).filter(f => f.email !== user.email);
    })
  );

  loading = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);

    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(500)]],
      orientacoes: ['', [Validators.required, Validators.maxLength(500)]],
      destino: [null as string | null]
    });

    this.loading = true;
    firstValueFrom(
      this.solicitacoes.buscarSolicitacaoFuncionarioPorId(id)
    ).then(det => {
      this.solicitacao = det;
    }).catch(() => {
      this.snack.open('Solicitação não encontrada.', 'OK', { duration: 2500 });
      this.router.navigate(['/funcionario']);
    }).finally(() => this.loading = false);
  }

  async salvarManutencao(): Promise<void> {
    if (!this.solicitacao) { return; }
    if (this.form.invalid) {
      this.snack.open('Preencha descrição e orientações (máx. 500).', 'OK', { duration: 2500 });
      return;
    }

    const { descricao, orientacoes } = this.form.value as { descricao: string; orientacoes: string };
    this.loading = true;
    this.solicitacoes.registrarManutencao(this.solicitacao.id, { descricao, orientacoes })
      .pipe(finalize(() => this.loading = false))
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
    const destinoIdStr = this.form.value.destino as string | null;

    if (!destinoIdStr) {
      this.snack.open('Selecione um funcionário de destino.', 'OK', { duration: 2500 });
      return;
    }

    combineLatest([this.funcionarios$, this.auth.user$]).pipe(
      map(([lista, user]) => {
        const me = lista.find(f => f.email === user!.email);
        return { me, destinoIdStr };
      }),
      switchMap(({ me, destinoIdStr }) => {
        if (me && me.id === destinoIdStr) {
          this.snack.open('Não é possível redirecionar para si mesmo.', 'OK', { duration: 2500 });
          return of(null);
        }
        this.loading = true;
        return this.solicitacoes.redirecionar(this.solicitacao!.id, Number(destinoIdStr))
          .pipe(finalize(() => this.loading = false));
      })
    ).subscribe({
      next: (res) => {
        if (res === null) { return; }
        firstValueFrom(this.funcionarios$).then(list => {
          const f = list.find(x => x.id === destinoIdStr);
          this.snack.open(`Solicitação redirecionada para ${f?.nome ?? 'o funcionário selecionado'}.`, 'OK', { duration: 3000 });
          this.router.navigate(['/funcionario']);
        });
      },
      error: (err) => {
        this.snack.open(err?.error?.message ?? 'Falha ao redirecionar.', 'OK', { duration: 3000 });
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/funcionario']);
  }
}