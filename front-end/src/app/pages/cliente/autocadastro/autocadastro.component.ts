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
import { AutocadastroService } from '../../../services/autocadastro.service';
import { RegisterRequest  } from '../../../services/autocadastro.service';

@Component({
  selector: 'app-autocadastro',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, HttpClientModule, CardModule, InputTextModule, InputMaskModule, ButtonModule ],
  templateUrl: './autocadastro.component.html',
  styleUrls: ['./autocadastro.component.css']
})
export class AutocadastroComponent {
  form: FormGroup;

  constructor( public router: Router, private http: HttpClient, private fb: FormBuilder, private auth: AutocadastroService ) {
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

    const dto: RegisterRequest = {
      cpf: (v.cpf || '').replace(/\D/g, ''),
      nome: (v.nome || '').toString().trim(),
      email: (v.email || '').toString().trim().toLowerCase(),
      telefone: (v.telefone || '').replace(/\D/g, ''),
      cep: (v.cep || '').replace(/\D/g, ''),
      rua: (v.rua || '').toString().trim(),
      bairro: (v.bairro || '').toString().trim(),
      numero: (v.numero || '').toString().trim(),
      complemento: (v.complemento || '').toString().trim() || undefined,
      cidade: (v.cidade || '').toString().trim(),
      estado: ((v.estado || '') as string).toUpperCase().slice(0, 2),
    };

    this.auth.register(dto).subscribe({
      next: (created) => {
        alert('Cadastro realizado com sucesso! Você receberá sua senha por e-mail.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        if (err.status === 409) {
          const detail = err.error?.detail || err.error?.message || err.error || 'Conflito de cadastro.';
          if ((detail as string).toLowerCase().includes('e-mail') || (detail as string).toLowerCase().includes('email')) {
            this.form.get('email')?.setErrors({ server: detail });
          } else if ((detail as string).toLowerCase().includes('cpf')) {
            this.form.get('cpf')?.setErrors({ server: detail });
          }
          alert(detail);
          return;
        }

        if (err.status === 400 && err.error?.errors && Array.isArray(err.error.errors)) {
          err.error.errors.forEach((e: any) => {
            const field = e.field;
            const message = e.message || 'Inválido';
            this.form.get(field)?.setErrors({ server: message });
          });
          return;
        }

        console.error('Erro no autocadastro', err);
        alert('Não foi possível concluir o cadastro. Tente novamente.');
      }
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }
}
