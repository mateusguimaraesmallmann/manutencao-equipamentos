import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/common/navbar/navbar.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, CommonModule, NavbarComponent, NgIf],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	title = 'frontend';

	constructor(public router: Router) {}

	displayNavbar(): boolean {
		const nonBarRoutes = ['/login', '/autocadastro'];

		return !nonBarRoutes.includes(this.router.url);
	}
}
