import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            HttpClientModule,
            ReactiveFormsModule,
            MatCardModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule
          ],
  templateUrl: './autocadastro.component.html',
  styleUrl: './autocadastro.component.css'
})
export class AutocadastroComponent {

  form: FormGroup;

  usuario = {
    cpf: '',
    nome: '',
    email: '',
    telefone: '',
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    senha: ''
  };

  constructor(public router: Router, 
              private http: HttpClient,
              private fb: FormBuilder) {
                this.form = this.fb.group({
                  cpf: ['', Validators.required],
                  nome: ['', Validators.required],
                  email: ['', [Validators.required, Validators.email]],
                  telefone: ['', Validators.required],
                  cep: ['', Validators.required],
                  rua: [''],
                  bairro: [''],
                  cidade: [''],
                  estado: ['']
                });
              }

  buscarEnderecoPorCEP() {
    if (this.usuario.cep.length === 8) {
      this.http.get<any>(`https://viacep.com.br/ws/${this.usuario.cep}/json/`)
        .subscribe(data => {
          if (!data.erro) {
            this.usuario.rua = data.logradouro;
            this.usuario.bairro = data.bairro;
            this.usuario.cidade = data.localidade;
            this.usuario.estado = data.uf;
          } else {
            alert('CEP não encontrado');
          }
        }, () => {
          alert('Erro ao buscar o CEP.');
        });
    }
  }

  gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos
  }

  cadastrar() {
    this.usuario.senha = this.gerarSenha();
    
    // Simular envio de e-mail (substituir por backend futuramente)
    console.log(`Senha enviada para ${this.usuario.email}: ${this.usuario.senha}`);

    // Armazenar localmente por enquanto
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    const emailJaExiste = usuarios.some((u: any) => u.email === this.usuario.email);
    const cpfJaExiste = usuarios.some((u: any) => u.cpf === this.usuario.cpf);

    if (emailJaExiste) {
      alert('E-mail já cadastrado!');
      return;
    }

    if (cpfJaExiste) {
      alert('CPF já cadastrado!');
      return;
    }

    usuarios.push(this.usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Sua senha foi enviada por e-mail.');
    this.router.navigate(['/login']);
  }

  buscarEndereco() {
    const cep = this.form.get('cep')?.value;
    if (cep) {
      this.http.get(`https://viacep.com.br/ws/${cep}/json/`).subscribe((dados: any) => {
        this.form.patchValue({
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        });
      });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
      // Aqui você pode adicionar a lógica para salvar os dados localmente e simular o envio do e-mail
    } else {
      console.log('Formulário inválido');
    }
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
  
}