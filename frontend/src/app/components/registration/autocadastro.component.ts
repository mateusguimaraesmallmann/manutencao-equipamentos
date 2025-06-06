import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../services/index';

@Component({
	selector: 'app-autocadastro',
	templateUrl: './autocadastro.component.html',
	styleUrls: ['./autocadastro.component.css'],
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
})
export class AutocadastroComponent {
	cadastroForm: FormGroup;

	constructor(
		private fb: FormBuilder,
		private http: HttpClient,
		private router: Router,
		private authService: AuthService,
	) {
		this.cadastroForm = this.fb.group({
			document: ['', [Validators.required]],
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]],
			zip_code: ['', [Validators.required]],
			address: [''],
		});
	}

	onCepChange() {
		const zip_code = this.cadastroForm.get('zip_code')?.value;
		if (zip_code.length === 8) {
			this.http
				.get(`https://viacep.com.br/ws/${zip_code}/json/`)
				.subscribe((data: any) => {
					if (!data.erro) {
						this.cadastroForm.patchValue({
							address: `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`,
						});
					}
				});
		}
	}

	onSubmit() {
		if (this.cadastroForm.valid) {
			const registerData = this.cadastroForm.value;

			this.authService.registerClient(registerData).subscribe({
				next: (response) => {
					alert('Usuário cadastrado com sucesso');
				},
				error: (error) => {
					console.log(error);
				},
			});
		}
	}

	voltarParaLogin() {
		this.router.navigate(['/login']);
	}
}
