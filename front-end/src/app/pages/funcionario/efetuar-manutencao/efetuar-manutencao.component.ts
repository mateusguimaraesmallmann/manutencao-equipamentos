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
    this.solicitacao = this.service.getById(id);

    this.form = this.fb.group({
      descricao: ['', [Validators.required, Validators.maxLength(1000)]],
      orientacoes: ['', [Validators.maxLength(1000)]],
      destino: [null] // para RF015
    });

    this.funcionarios = this.carregarFuncionarios();
  }

  get funcionarioLogado() {
    try {
      return JSON.parse(localStorage.getItem('currentUser') || '{}') || { nome: 'Funcionário', email: 'func@example.com' };
    } catch {
      return { nome: 'Funcionário', email: 'func@example.com' };
    }
  }

  salvarManutencao(): void {
    if (!this.solicitacao || this.form.invalid) return;
    const { descricao, orientacoes } = this.form.value;

    this.service.efetuarManutencao(this.solicitacao.id, { descricao, orientacoes }, {
      nome: this.funcionarioLogado?.nome,
      email: this.funcionarioLogado?.email
    }).subscribe(ok => {
      if (ok) {
        this.snack.open('Manutenção registrada. Estado → ARRUMADA.', 'OK', { duration: 3000 });
        this.router.navigate(['/funcionario']);
      } else {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 3000 });
      }
    });
  }

  redirecionar(): void {
    if (!this.solicitacao) return;
    const destino = this.form.value.destino;
    if (!destino) {
      this.snack.open('Selecione um destino para redirecionar.', 'OK', { duration: 2500 });
      return;
    }
    this.service.redirecionarManutencao(this.solicitacao.id, destino, {
      nome: this.funcionarioLogado?.nome,
      email: this.funcionarioLogado?.email
    }).subscribe(ok => {
      if (ok) {
        this.snack.open(`Solicitação redirecionada para ${destino.nome}.`, 'OK', { duration: 3000 });
        this.router.navigate(['/funcionario']);
      } else {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 3000 });
      }
    });
  }

  voltar(): void {
    this.router.navigate(['/funcionario']);
  }

  private carregarFuncionarios(): Array<{nome: string; email: string}> {
    try {
      const raw = localStorage.getItem('funcionarios');
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) return arr;
      }
    } catch {}
    return [
      { nome: 'Maria', email: 'maria@empresa.com' },
      { nome: 'Mário', email: 'mario@empresa.com' }
    ];
  }
}
