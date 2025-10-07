import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { firstValueFrom } from 'rxjs';

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

  constructor(private fb: FormBuilder, private router: Router, private auth: AutenticacaoService) {
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
    const senha  = (this.loginForm.get('password')?.value || '').toString();

    try {
      const user = await firstValueFrom(this.auth.login(email, senha));
      if (user?.perfil === 'FUNCIONARIO') {
        this.router.navigate(['/funcionario']);
      } else {
        this.router.navigate(['/pagina-cliente']);
      }
    } catch {
      this.errorMessage = 'Usuário ou senha incorretos.';
    }
  }

  goToRegister(): void {
    this.router.navigate(['/autocadastro']);
  }
}
