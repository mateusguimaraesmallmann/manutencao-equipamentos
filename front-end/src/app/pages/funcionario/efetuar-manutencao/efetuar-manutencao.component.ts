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
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-efetuar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  templateUrl: './efetuar-manutencao.component.html',
  styleUrls: ['./efetuar-manutencao.component.css']
})
export class EfetuarManutencaoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private service = inject(SolicitacoesService);

  solicitacao?: Solicitacao;
  form!: FormGroup;

  funcionarios: Array<{nome: string; email: string}> = [];

ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id')!;
  firstValueFrom(this.service.getById$(id))
    .then(found => {
      if (!found) {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 2500 });
        this.router.navigate(['/funcionario']);
        return;
      }
      this.solicitacao = found;

      this.form = this.fb.group({
        descricao: ['', [Validators.required, Validators.maxLength(1000)]],
        orientacoes: ['', [Validators.maxLength(1000)]],
        destino: [null as { nome: string; email: string } | null]
      });

      const meEmail = this.funcionarioLogado.email;
      this.funcionarios = this.carregarFuncionarios()
        .filter(f => f.email !== meEmail);
    })
    .catch(() => {
      this.snack.open('Solicitação não encontrada.', 'OK', { duration: 2500 });
      this.router.navigate(['/funcionario']);
    });
}

  get funcionarioLogado(): { nome: string; email: string } {
    try {
      const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
      return { nome: u?.nome ?? 'Funcionário', email: u?.email ?? 'func@example.com' };
    } catch {
      return { nome: 'Funcionário', email: 'func@example.com' };
    }
  }

  salvarManutencao(): void {
    if (!this.solicitacao || this.form.get('descricao')?.invalid) {
      this.snack.open('Descreva a manutenção realizada.', 'OK', { duration: 2000 });
      return;
    }
    const { descricao, orientacoes } = this.form.value as { descricao: string; orientacoes?: string };

    this.service.efetuarManutencao(this.solicitacao.id, { descricao, orientacoes }, this.funcionarioLogado)
      .subscribe((ok: Solicitacao | undefined) => {
        if (ok) {
          this.snack.open('Manutenção registrada (estado: ARRUMADA).', 'OK', { duration: 3000 });
          this.router.navigate(['/funcionario']);
        } else {
          this.snack.open('Falha ao salvar manutenção.', 'OK', { duration: 3000 });
        }
      });
  }

  redirecionar(): void {
    if (!this.solicitacao) return;
    const destino = this.form.value.destino as { nome: string; email: string } | null;

    if (!destino) {
      this.snack.open('Selecione um funcionário de destino.', 'OK', { duration: 2500 });
      return;
    }
    if (destino.email === this.funcionarioLogado.email) {
      this.snack.open('Não é possível redirecionar para si mesmo.', 'OK', { duration: 2500 });
      return;
    }

    this.service.redirecionarManutencao(this.solicitacao.id, destino, this.funcionarioLogado)
      .subscribe((ok: Solicitacao | undefined) => {
        if (ok) {
          this.snack.open(`Solicitação redirecionada para ${destino.nome}.`, 'OK', { duration: 3000 });
          this.router.navigate(['/funcionario']);
        } else {
          this.snack.open('Falha ao redirecionar.', 'OK', { duration: 3000 });
        }
      });
  }

  voltar(): void {
    this.router.navigate(['/funcionario']);
  }

  private carregarFuncionarios(): Array<{nome: string; email: string}> {
    try {
      const raw = localStorage.getItem('funcionarios');
      const arr = raw ? JSON.parse(raw) : null;
      if (Array.isArray(arr) && arr.length) return arr;
    } catch {}
    return [
      { nome: 'Maria', email: 'maria@empresa.com' },
      { nome: 'Mário', email: 'mario@empresa.com' }
    ];
  }
}
