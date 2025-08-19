import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { NavbarClienteComponent } from '../../components/navbar-cliente/navbar-cliente.component';

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
    NavbarClienteComponent
  ],
  templateUrl: './solicitacao-manutencao.component.html',
  styleUrls: ['./solicitacao-manutencao.component.scss']
})
export class SolicitacaoManutencaoComponent {
  form: FormGroup;
  categorias: string[] = ['Notebook', 'Desktop', 'Impressora', 'Mouse', 'Teclado'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      equipamento: ['', Validators.required],
      categoria: ['', Validators.required],
      defeito: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const novaSolicitacao = {
        ...this.form.value,
        dataHora: new Date().toISOString(),
        estado: 'ABERTA'
      };

      const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');
      solicitacoes.push(novaSolicitacao);
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes));

      alert('Solicitação registrada com sucesso!');
      this.form.reset();
    }
  }
}