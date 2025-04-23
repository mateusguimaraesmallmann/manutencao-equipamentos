import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services';
import { OrderStatus } from '../../models/order-status.enum';

@Component({
	selector: 'orders-tag',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
	orders: Order[] = [];

	constructor(
		private orderService: OrderService,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		let client_id = this.authService.getUser()?.client_id!;

		this.orderService.getOrdersFromClient(client_id).subscribe({
			next: (response) => {
				this.orders = response;
			},
		});
	}

	displayActionBtn(action: string, order: Order): boolean {
		switch (action) {
			case 'approve':
			case 'reject':
				return order.status == OrderStatus.ORCADA;
			default:
				return false;
		}
	}

	visualizarPedido(pedido: string) {
		return alert(pedido);
	}
	aprovarPedido() {}
	rejeitarPedido() {}
	pagarServico() {}
	resgatarServico() {}
}
