import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// PrimeNG imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

// Serviços e modelos da sua aplicação
import { CategoriasService } from '../../../services/categorias.service';
import { EstadoSolicitacao, Solicitacao } from '../../../shared/models/solicitacao.model';

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    TextareaModule,
    DropdownModule,
    ButtonModule
  ],
  templateUrl: './solicitacao-manutencao.component.html',
  styleUrls: ['./solicitacao-manutencao.component.css']
})
export class SolicitacaoManutencaoComponent {
  form: FormGroup;
  categorias: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService,
    private router: Router
  ) {
    this.form = this.fb.group({
      equipamento: ['', [Validators.required, Validators.maxLength(100)]],
      categoria: ['', Validators.required],
      defeito: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  ngOnInit(): void {
    this.categoriasService.ativas$.subscribe(cats => {
      this.categorias = cats.map(c => c.nome);
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

    const user = (() => {
      try {
        return JSON.parse(localStorage.getItem('currentUser') || 'null');
      } catch {
        return null;
      }
    })();

    const nova: Solicitacao = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      clienteNome: (user?.nome || '').toString(),
      clienteEmail: (user?.email || '').toString().toLowerCase(),
      descricaoProduto: this.form.value.equipamento,
      defeito: this.form.value.defeito,
      categoria: this.form.value.categoria,
      estado: EstadoSolicitacao.ABERTA,
      historico: []
    };

    const list: Solicitacao[] = (() => {
      try {
        return JSON.parse(localStorage.getItem('solicitacoes') || '[]');
      } catch {
        return [];
      }
    })();

    list.push(nova);
    localStorage.setItem('solicitacoes', JSON.stringify(list));

    this.isSubmitting = false;
    alert('Solicitação registrada com sucesso!');
    this.router.navigate(['/pagina-cliente']);
  }
}
