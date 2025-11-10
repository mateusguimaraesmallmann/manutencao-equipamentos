import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { FuncionarioSolicitacaoDetalheDTO } from '../../../shared/dtos/solicitacao-funcionario-detalhe.dto';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CardModule, InputNumberModule, ButtonModule, ToastModule, TagModule, DividerModule ],
  providers: [MessageService],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.css']
})
export class EfetuarOrcamentoComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private service = inject(SolicitacoesService);
  private messageService = inject(MessageService);

  solicitacao?: FuncionarioSolicitacaoDetalheDTO;

  form = this.fb.group({
    valor: [null as number | null, [Validators.required, Validators.min(0.01)]]
  });

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (Number.isNaN(id)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Solicitação inválida.',
        life: 2500
      });
      this.router.navigate(['/funcionario']);
      return;
    }

    this.service.buscarSolicitacaoFuncionarioPorId(id).subscribe({
      next: (s) => {
        this.solicitacao = s;
        this.form.patchValue({ valor: s.orcamentoValor ?? null });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Solicitação não encontrada.',
          life: 2500
        });
        this.router.navigate(['/funcionario']);
      }
    });
  }

  salvar(): void {
    if (!this.solicitacao || this.form.invalid) return;

    const id = this.solicitacao.id;
    const valor = Number(this.form.value.valor);

    this.service.registrarOrcamento(id, valor).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Orçamento registrado',
          detail: `Serviço orçado em ${valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}.`,
          life: 3000
        });
        this.router.navigate(['/funcionario']);
      },
      error: (err) => {
        const msg =
          err?.status === 409
            ? 'Só é possível orçar solicitações ABERTAS.'
            : 'Falha ao salvar orçamento.';
        this.messageService.add({
          severity: 'warn',
          summary: 'Atenção',
          detail: msg,
          life: 3000
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/funcionario']);
  }
}