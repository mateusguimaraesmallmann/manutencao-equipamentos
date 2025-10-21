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
import { firstValueFrom } from 'rxjs';
import { FuncionarioSolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-funcionario-detalhe.dto';


@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule
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

  solicitacao?: FuncionarioSolicitacaoDetalheDTO;
  form = this.fb.group({
    valor: [null as number | null, { validators: [Validators.required, Validators.min(0.01)] }]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      this.snack.open('Solicitação inválida.', 'OK', { duration: 2500 });
      this.router.navigate(['/funcionario']);
      return;
    }

    this.service.buscarSolicitacaoFuncionarioPorId(id).subscribe({
      next: (s) => {
        this.solicitacao = s;
        this.form.patchValue({ valor: s.orcamentoValor ?? null });
      },
      error: () => {
        this.snack.open('Solicitação não encontrada.', 'OK', { duration: 2500 });
        this.router.navigate(['/funcionario']);
      }
    });
  }

  salvar(): void {
    if (!this.solicitacao || this.form.invalid) return;
    
    const id = this.solicitacao.id;
    const valor = Number(this.form.value.valor);

    this.service.registrarOrcamento(id, valor).subscribe({
      next: (atualizada) => {
        this.snack.open(
          `Serviço orçado em ${valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}.`,
          'OK',
          { duration: 3000 }
        );
        this.router.navigate(['/funcionario']);
      },
      error: (err) => {
        const msg = err?.status === 409
          ? 'Só é possível orçar solicitações ABERTAS.'
          : 'Falha ao salvar orçamento.';
        this.snack.open(msg, 'OK', { duration: 3000 });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/funcionario']);
  }

}