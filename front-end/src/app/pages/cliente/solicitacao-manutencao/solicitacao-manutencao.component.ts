import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
//import { NavbarClienteComponent } from '../../components/navbar-cliente/navbar-cliente.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CategoriasService } from '../../../services/categorias.service';
import { EstadoSolicitacao, Solicitacao } from '../../../shared/models/solicitacao.model';


@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatChipsModule,
    MatTooltipModule
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

  voltar() {
    this.router.navigate(['/pagina-cliente']);
  }

  onReset() {
    this.form.reset();
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const user = (() => {
      try { return JSON.parse(localStorage.getItem('currentUser') || 'null'); }
      catch { return null; }
    })();

    const nova: Solicitacao = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      createdAt: new Date().toISOString(),
      clienteNome: (user?.nome || '').toString(),
      clienteEmail: (user?.email || '').toString().toLowerCase(),
      descricaoProduto: this.form.value.equipamento,
      defeito: this.form.value.defeito,
      estado: EstadoSolicitacao.ABERTA,
      historico: []
    };

    const list: Solicitacao[] = (() => {
      try { return JSON.parse(localStorage.getItem('solicitacoes') || '[]'); }
      catch { return []; }
    })();

    list.push(nova);
    localStorage.setItem('solicitacoes', JSON.stringify(list));

    this.isSubmitting = false;
    alert('Solicitação registrada com sucesso!');
    this.router.navigate(['/pagina-cliente']); // volta para a home do cliente
  }
}