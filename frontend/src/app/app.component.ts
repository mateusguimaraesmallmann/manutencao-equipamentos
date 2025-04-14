import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { NgIf } from '@angular/common';

import { Router, RouterOutlet } from '@angular/router';

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
