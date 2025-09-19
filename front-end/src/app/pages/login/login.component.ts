import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private async rehashSenhaComSalt(senha: string, salt: string): Promise<string> {
    const te = new TextEncoder();
    const data = te.encode(`${salt}:${senha}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)));
  }

  async onLogin(): Promise<void> {
    this.errorMessage = '';

    const email = (this.loginForm.get('email')?.value || '').toString().trim().toLowerCase();
    const senha = (this.loginForm.get('password')?.value || '').toString();

    try {
      const funcionarios = JSON.parse(localStorage.getItem('funcionarios') || '[]');
      const f = funcionarios.find((x: any) => x?.ativo && x?.email?.toLowerCase() === email);
      if (f) {
        const hash = await this.rehashSenhaComSalt(senha, f.senhaSalt);
        if (hash === f.senhaHash) {
          localStorage.setItem('currentUser', JSON.stringify({ nome: f.nome, email: f.email, perfil: 'FUNCIONARIO' }));
          this.router.navigate(['/funcionario']);
          return;
        }
      }
    } catch {}

    try {
      const clientes = JSON.parse(localStorage.getItem('clientes') || '[]');
      const c = clientes.find((x: any) => x?.email?.toLowerCase() === email);
      if (c) {
        let ok = false;
        if (c.senhaSalt && c.senhaHash) {
          const hash = await this.rehashSenhaComSalt(senha, c.senhaSalt);
          ok = hash === c.senhaHash;
        } else if (c.senha) {
          ok = c.senha === senha;
        }
        if (ok) {
          localStorage.setItem('currentUser', JSON.stringify({ nome: c.nome, email: c.email, perfil: 'CLIENTE' }));
          this.router.navigate(['/pagina-cliente']);
          return;
        }
      }
    } catch {}

    this.errorMessage = 'Usuário ou senha incorretos.';
  }

  goToRegister(): void {
    this.router.navigate(['/autocadastro']);
  }
}
