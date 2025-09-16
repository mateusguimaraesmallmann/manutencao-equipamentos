import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  categorias: string[] = ['Notebook', 'Desktop', 'Impressora', 'Mouse', 'Teclado'];

  // ✅ propriedades usadas no template
  isSubmitting = false;
  selectedFiles: File[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      // existentes
      equipamento: ['', [Validators.required, Validators.maxLength(100)]],
      numeroSerie: [''],
      categoria: ['', Validators.required],
      prioridade: ['Média', Validators.required],
      dataPreferencial: [null],
      localizacao: [''],
      telefone: [''],
      email: ['', Validators.email],
      defeito: ['', [Validators.required, Validators.maxLength(1000)]],
      aceiteTermos: [false, Validators.requiredTrue]
    });
  }

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      // limita a 5 arquivos conforme sua mensagem
      this.selectedFiles = Array.from(input.files).slice(0, 5);
    }
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  onReset() {
    this.form.reset({
      prioridade: 'Média',
      aceiteTermos: false
    });
    this.selectedFiles = [];
  }

  preencherExemplo() {
    this.form.patchValue({
      equipamento: 'Impressora HP LaserJet 1020',
      numeroSerie: 'BR-HP-1020-0001',
      categoria: 'Impressora',
      prioridade: 'Média',
      dataPreferencial: null,
      localizacao: 'Bloco B, 3º andar, TI',
      telefone: '(41) 99999-0000',
      email: 'cliente@example.com',
      defeito: 'Papel atolando com frequência e impressão falha.'
    });
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;

    const novaSolicitacao = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      createdAt: new Date().toISOString(),
      clienteNome: this.guardarNomeCliente(),
      descricaoProduto: this.form.value.equipamento,
      estado: 'ABERTA',
      numeroSerie: this.form.value.numeroSerie,
      categoria: this.form.value.categoria,
      prioridade: this.form.value.prioridade,
      dataPreferencial: this.form.value.dataPreferencial,
      localizacao: this.form.value.localizacao,
      telefone: this.form.value.telefone,
      email: this.form.value.email,
      defeito: this.form.value.defeito,
      anexos: this.selectedFiles.map(f => ({ name: f.name, size: f.size, type: f.type }))
    };

    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
    solicitacoes.push(novaSolicitacao);
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

    // feedback e limpeza
    alert('Solicitação registrada com sucesso!');
    this.onReset();
    this.isSubmitting = false;
  }

  private guardarNomeCliente(): string {
    try {
      const raw = localStorage.getItem('currentUser');
      if (raw) {
        const u = JSON.parse(raw);
        return u?.nome || 'Cliente';
      }
    } catch {}
    return 'Cliente';
  }
}