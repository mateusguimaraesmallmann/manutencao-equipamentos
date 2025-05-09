import { Component } from '@angular/core';

@Component({
	selector: 'app-order',
	standalone: true,
	imports: [],
	templateUrl: './order.component.html',
	styleUrl: './order.component.css',
})
export class OrderComponent {
	order = {
		id: 1,
		client_id: 1,
		employee_id: 1,
		category_id: 1,
		equipment_description: 'NOTEBOOK X',
		deffect_description: 'NAO LIGA',
		price: null,
		created_at: '23/04/2025 10:15',
		status: 'ABERTA',
		order_actions: [
			{
				id: 1,
				order_id: 1,
				employee_id: 1,
				created_at: '23/04/2025 10:15',
				STATUS: 'ABERTA',
			},
		],
	};
}
