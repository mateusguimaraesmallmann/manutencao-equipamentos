import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus } from '../../../models';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from './order/order.component';

enum OrderAction {
	OPENED,
	REJECT,
	APPROVE,
	EVALUATE,
	REPAIR,
	REDIRECT,
	PAY,
	RECOVER,
	FINISH,
}
@Component({
	selector: 'orders-tag',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './orders.component.html',
	styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
	@Input() forClient: boolean = false;

	payAction = OrderAction.PAY;
	approveAction = OrderAction.APPROVE;
	rejectAction = OrderAction.REJECT;
	recoverAction = OrderAction.RECOVER;
	evaluateAction = OrderAction.EVALUATE;

	orders: Order[] = [];

	constructor(
		private orderService: OrderService,
		private authService: AuthService,
		private modalService: NgbModal,
	) {}

	ngOnInit(): void {
		this.loadOrders();
	}

	loadOrders(): void {
		if (this.forClient) this.setupClient();
		else this.setupEmployee();
	}

	setupClient(): void {
		let client_id = this.authService.getUser()?.client_id!;

		this.orderService.getOrdersFromClient(client_id).subscribe({
			next: (response) => {
				this.orders = response;
			},
		});
	}

	setupEmployee(): void {
		let employee_id = this.authService.getUser()?.employee_id!;

		this.orderService.getOrdersFromEmployee(employee_id).subscribe({
			next: (response) => {
				this.orders = response;
			},
		});
	}

	getActionButtons(order: Order) {
		let btns = [];

		switch (order.status) {
			case OrderStatus.ABERTA:
				if (!this.forClient) {
					btns.push({
						label: 'Orçar',
						action: OrderAction.EVALUATE,
						classes: 'btn-primary',
					});
				}
				break;
			case OrderStatus.ORCADA:
				if (this.forClient) {
					btns.push({
						label: 'Aprovar',
						action: OrderAction.APPROVE,
						classes: 'btn-success',
					});
					btns.push({
						label: 'Rejeitar',
						action: OrderAction.REJECT,
						classes: 'btn-danger',
					});
				}
				break;
			case OrderStatus.REJEITADA:
				if (this.forClient)
					btns.push({
						label: 'Resgatar',
						action: OrderAction.RECOVER,
						classes: 'btn-primary',
					});
				break;
			case OrderStatus.APROVADA:
			case OrderStatus.REDIRECIONADA:
				if (!this.forClient)
					btns.push({
						label: 'Reparar',
						action: OrderAction.REPAIR,
						classes: 'btn-success',
					});
				break;
			case OrderStatus.ARRUMADA:
				if (this.forClient)
					btns.push({
						label: 'Pagar',
						action: OrderAction.PAY,
						classes: 'btn-success',
					});
				break;
			case OrderStatus.PAGA:
				if (!this.forClient)
					btns.push({
						label: 'Finalizar',
						action: OrderAction.FINISH,
						classes: 'btn-success',
					});
				break;
			default:
				break;
		}

		return btns;
	}

	updateOrder(action: OrderAction, order: Order) {
		switch (action) {
			case OrderAction.APPROVE:
				if (confirm('Tem certeza de que deseja aprovar o serviço?')) {
					this.orderService.newAction(order, OrderStatus.APROVADA).subscribe({
						next: (response) => {
							alert('Orçamento aprovado com sucesso');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
				break;
			case OrderAction.EVALUATE:
				break;
			case OrderAction.REJECT:
				if (confirm('Tem certeza de que deseja rejeitar o serviço?')) {
					this.orderService.newAction(order, OrderStatus.REJEITADA).subscribe({
						next: (response) => {
							alert('Orçamento rejeitado com sucesso');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
				break;
			case OrderAction.RECOVER:
				if (confirm('Tem certeza de que deseja resgatar o serviço?')) {
					this.orderService.newAction(order, OrderStatus.APROVADA).subscribe({
						next: (response) => {
							alert('Orçamento aprovada com sucesso');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
				break;
			case OrderAction.REDIRECT:
				break;
			case OrderAction.PAY:
				break;
			case OrderAction.REPAIR:
				break;
			case OrderAction.FINISH:
				alert(`${order.id} clicked`);
				break;
			default:
				break;
		}
	}

	orderModal(orderId?: Number) {
		const modalRef = this.modalService.open(OrderComponent);
		modalRef.componentInstance.orderId = orderId;
		return;
	}
}
