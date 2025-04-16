import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormGroup,
	FormControl,
	Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule, RouterModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	loginForm: FormGroup = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(
		private authService: AuthService,
		private router: Router,
	) {}

	onSubmit() {
		if (!this.loginForm.valid) {
			this.loginForm.markAllAsTouched();
			return;
		}

		const email = this.loginForm.get('email')?.value as string;
		const password = this.loginForm.get('password')?.value as string;

		this.authService.login(email, password).subscribe({
			next: (response) => {
				this.roleRedirect(response.role);
			},
			error: (err) => {
				alert('Invalid email or password!');
				console.error('Error during signIn', err);
			},
		});
	}

	// ROLE 1 = employee (funcionario)
	// ROLE 2 = client (cliente)
	roleRedirect(role: Number) {
		switch (role) {
			case 1:
				this.router.navigate(['/dashboard']);
				break;
			default:
				this.router.navigate(['/home']);
		}
	}
}
