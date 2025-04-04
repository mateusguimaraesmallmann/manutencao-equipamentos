import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-autocadastro',
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})

export class AutocadastroComponent {
  
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.cadastroForm = this.fb.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      cep: ['', [Validators.required]],
      endereco: ['']
    });
  }

  onCepChange() {
    const cep = this.cadastroForm.get('cep')?.value;
    if (cep.length === 8) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((data: any) => {
        if (!data.erro) {
          this.cadastroForm.patchValue({
            endereco: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
          });
        }
      });
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Dados do formulário:', this.cadastroForm.value);
      alert('Cadastro realizado com sucesso!');
    }
  }
}