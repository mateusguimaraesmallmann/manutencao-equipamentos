import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
	selector: 'dynamic-navbar',
	standalone: true,
	imports: [],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {
	private name: string | undefined;
	private auth: AuthService;
	private router: Router;

	constructor(auth: AuthService, router: Router) {
		this.name = auth.getUser()?.name;
		this.router = router;
		this.auth = auth;
	}

	client_menu_items = [
		{ name: 'Clientes', path: '/cliente' },
		{ name: 'Equipamentos', path: '/equipamento' },
	];

	getItems(): Array<any> {
		return this.client_menu_items;
	}

	getName(): string {
		return this.name || 'INVALID USER';
	}

	logout(): void {
		this.auth.logout();
		this.router.navigate(['/login']);
	}
}
