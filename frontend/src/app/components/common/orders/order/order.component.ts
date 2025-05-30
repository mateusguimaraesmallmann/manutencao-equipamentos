import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../../../../services/order.service';

@Component({
	selector: 'app-order',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './order.component.html',
	styleUrl: './order.component.css',
})
export class OrderComponent {
	orderId?: number | null;
	order: any;

	constructor(
		private orderService: OrderService,
		public activeModal: NgbActiveModal,
	) {}

	ngOnInit(): void {
		this.orderService.getOrder(this.orderId!).subscribe((response) => {
			this.order = response;
		});
	}
}
