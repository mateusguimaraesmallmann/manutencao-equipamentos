import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

import { CategoriasService } from '../../../services/categorias.service';
import { EstadoSolicitacao, Solicitacao } from '../../../shared/models/solicitacao.model';
import { SolicitacoesService } from '../../../services/solicitacoes.service';
import { SolicitacaoCreateDTO } from '../../../shared/dtos/solicitacao-create.dto';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, CardModule, InputTextModule, TextareaModule, DropdownModule, ButtonModule ],
  templateUrl: './solicitacao-manutencao.component.html',
  styleUrls: ['./solicitacao-manutencao.component.css']
})
export class SolicitacaoManutencaoComponent {
  form: FormGroup;
  categorias: { label: string; value: number }[] = [];
  isSubmitting = false;

  constructor( private fb: FormBuilder, private categoriasService: CategoriasService, private solicitacoesService: SolicitacoesService,  private router: Router ) {
    this.form = this.fb.group({
      equipamento: ['', [Validators.required, Validators.maxLength(200)]],
      categoria: ['', Validators.required],
      defeito: ['', [Validators.required, Validators.maxLength(500)]]
    });
  }

  ngOnInit(): void {
    this.categoriasService.ativas$.subscribe(cats => {
      this.categorias = cats.map(c => ({ label: c.nome , value: Number.parseInt(c.id) }));
    });
  }

  voltar(): void {
    this.router.navigate(['/pagina-cliente']);
  }

  onReset(): void {
    this.form.reset();
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const dto: SolicitacaoCreateDTO = {
      descricaoProduto: this.form.value.equipamento,
      defeito: this.form.value.defeito || '',
      categoriaId: this.form.value.categoria
    };

    this.solicitacoesService.criar(dto).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Solicitação registrada com sucesso!');
        this.router.navigate(['/pagina-cliente']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error('Erro ao criar solicitação', err);
        alert('Não foi possível registrar sua solicitação. Tente novamente.');
      }
    });
  }

}