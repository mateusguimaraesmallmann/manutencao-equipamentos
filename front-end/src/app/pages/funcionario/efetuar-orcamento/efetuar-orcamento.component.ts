import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { Solicitacao } from '../../../shared/models/solicitacao.model';
import { Cliente } from '../../../shared/models/cliente.model';


@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private snack = inject(MatSnackBar);
  private service = inject(SolicitacoesService);

  solicitacao?: Solicitacao;
  form!: FormGroup;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.solicitacao = this.service.getById(id);

    this.form = this.fb.group({
      valor: [this.solicitacao?.orcamentoValor ?? null, [Validators.required, Validators.min(0.01)]]
    });
  }

  get funcionarioLogado() {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : { nome: 'Funcionário', email: 'func@example.com' };
  }

  salvar(): void {
    if (!this.solicitacao || this.form.invalid) return;
    const valor = Number(this.form.value.valor);

    this.service.registrarOrcamento(this.solicitacao.id, valor, {
      nome: this.funcionarioLogado?.nome,
      email: this.funcionarioLogado?.email
    }).subscribe((atualizada) => {
      if (atualizada) {
        this.snack.open(
          `Serviço Orçado no Valor ${valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
          'OK',
          { duration: 3000 }
        );
        this.router.navigate(['/funcionario']);
      } else {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/funcionario']);
  }
}

