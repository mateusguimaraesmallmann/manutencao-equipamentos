import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // PrimeNG
    CardModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule
  ],
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css'] // <- corrigido (plural)
})
export class AutocadastroComponent {
  form: FormGroup;

  constructor(
    public router: Router,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cep: ['', Validators.required],
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }

  private gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4 dígitos
  }

  buscarEndereco() {
    const cepRaw: string = this.form.get('cep')?.value || '';
    const cep = (cepRaw || '').replace(/\D/g, ''); // somente números

    if (cep.length !== 8) return;

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe({
      next: dados => {
        if (dados?.erro) {
          alert('CEP não encontrado.');
          return;
        }
        this.form.patchValue({
          rua: dados.logradouro || '',
          bairro: dados.bairro || '',
          cidade: dados.localidade || '',
          estado: dados.uf || ''
        });
      },
      error: () => alert('Erro ao buscar o CEP.')
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      console.log('Formulário inválido');
      return;
    }

    const usuario = {
      ...this.form.value,
      senha: this.gerarSenha()
    };

    // Simular envio de e-mail
    console.log(`Senha enviada para ${usuario.email}: ${usuario.senha}`);

    // Armazenar localmente por enquanto
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const emailJaExiste = usuarios.some((u: any) => u.email === usuario.email);
    const cpfJaExiste = usuarios.some((u: any) => u.cpf === usuario.cpf);

    if (emailJaExiste) {
      alert('E-mail já cadastrado!');
      return;
    }
    if (cpfJaExiste) {
      alert('CPF já cadastrado!');
      return;
    }

    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso! Sua senha foi enviada por e-mail.');
    this.router.navigate(['/login']);
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}
