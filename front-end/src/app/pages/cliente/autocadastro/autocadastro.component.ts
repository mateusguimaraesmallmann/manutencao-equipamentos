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
    CardModule,
    InputTextModule,
    InputMaskModule,
    ButtonModule
  ],
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
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

  /** Senha aleatória de 4 dígitos */
  private gerarSenha(): string {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  private async hashSenha(senha: string): Promise<{ salt: string; hash: string }> {
    const te = new TextEncoder();
    const saltBytes = new Uint8Array(16);
    crypto.getRandomValues(saltBytes);
    const salt = btoa(String.fromCharCode(...saltBytes));
    const digest = await crypto.subtle.digest('SHA-256', te.encode(`${salt}:${senha}`));
    const hash = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return { salt, hash };
  }

  buscarEndereco() {
    const cepRaw: string = this.form.get('cep')?.value || '';
    const cep = (cepRaw || '').replace(/\D/g, '');
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

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const cpfDigits = (v.cpf || '').replace(/\D/g, '');
    const cepDigits = (v.cep || '').replace(/\D/g, '');
    const emailNorm = (v.email || '').toString().trim().toLowerCase();

    const clientes = (() => {
      try { return JSON.parse(localStorage.getItem('clientes') || '[]'); }
      catch { return []; }
    })();

    const emailJaExiste = clientes.some((c: any) => (c.email || '').toLowerCase() === emailNorm);
    const cpfJaExiste = clientes.some((c: any) => ((c.cpf || '').toString().replace(/\D/g, '') === cpfDigits));

    if (emailJaExiste) { alert('E-mail já cadastrado!'); return; }
    if (cpfJaExiste)   { alert('CPF já cadastrado!');   return; }

    const senha = this.gerarSenha();
    const { salt, hash } = await this.hashSenha(senha);

    const now = new Date().toISOString();
    const novoCliente = {
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
      nome: (v.nome || '').toString().trim(),
      cpf: cpfDigits,
      email: emailNorm,
      telefone: v.telefone || '',
      endereco: {
        cep: cepDigits,
        rua: v.rua || '',
        numero: v.numero || '',
        bairro: v.bairro || '',
        cidade: v.cidade || '',
        estado: v.estado || '',
      },
      perfil: 'CLIENTE',
      senhaSalt: salt,
      senhaHash: hash,
      createdAt: now
    };

    // "envio" de senha por e-mail (simulado)
    console.log(`Senha enviada para ${novoCliente.email}: ${senha}`);

    clientes.push(novoCliente);
    localStorage.setItem('clientes', JSON.stringify(clientes));

    alert('Cadastro realizado com sucesso! Sua senha foi enviada por e-mail.');
    this.router.navigate(['/login']);
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}
