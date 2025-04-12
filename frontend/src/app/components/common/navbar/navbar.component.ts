import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'dynamic-navbar',
	standalone: true,
	imports: [RouterModule, NgFor],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.css',
})
export class NavbarComponent {
	client_menu_items = [{ name: 'Clientes', path: '/cliente' }];

	getItems(): Array<any> {
		return this.client_menu_items;
	}
}
