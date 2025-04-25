import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersComponent } from '../common/orders/orders.component';

@Component({
	selector: 'home-tag',
	standalone: true,
	imports: [RouterModule, OrdersComponent],
	templateUrl: './home.component.html',
	styleUrl: './home.component.css',
})
export class HomeComponent {
	constructor() {}
}
