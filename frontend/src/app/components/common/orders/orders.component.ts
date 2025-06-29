import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderStatus } from '../../../models';
import { OrderService } from '../../../services/order.service';
import { AuthService } from '../../../services';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderComponent } from './order/order.component';
import { InputDialogComponent } from './dialog/input.component';

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
				if (!this.forClient) {
					btns.push({
						label: 'Reparar',
						action: OrderAction.REPAIR,
						classes: 'btn-success',
					});

					btns.push({
						label: 'Redirecionar',
						action: OrderAction.REDIRECT,
						classes: 'btn-primary',
					});
				}
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
				this.inputModal('orcar', order.id);
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
				this.inputModal('redirecionar', order.id);
				break;
			case OrderAction.PAY:
				if (confirm('Confirmar pagamento?')) {
					this.orderService.newAction(order, OrderStatus.PAGA).subscribe({
						next: (response) => {
							alert('Pagamento confirmado com sucesso');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
				break;
			case OrderAction.REPAIR:
				this.inputModal('reparar', order.id);
				break;
			case OrderAction.FINISH:
				if (confirm('Deseja finalizar este serviço?')) {
					this.orderService.newAction(order, OrderStatus.FINALIZADA).subscribe({
						next: (response) => {
							alert('Serviço finalizado');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
				break;
			default:
				break;
		}
	}

	orderModal(orderId?: Number) {
		const modalRef = this.modalService.open(OrderComponent);
		modalRef.componentInstance.orderId = orderId;
		modalRef.componentInstance.forClient = this.forClient;

		modalRef.result.then((response) => {
			this.loadOrders();
		});
		return;
	}

	inputModal(type: string, orderId: Number | null): void {
		const modalRef = this.modalService.open(InputDialogComponent);
		modalRef.componentInstance.type = type;
		modalRef.componentInstance.orderId = orderId;

		modalRef.result.then((result: any) => {
			if (orderId) {
				const order = this.orders.find((o) => o.id === orderId);
				if (order) {
					let order_action = {
						order_id: order.id,
						employee_id: this.authService.getUser()?.employee_id,
						created_at: new Date(),
						status: order.status,
					};

					switch (type) {
						case 'orcar':
							order.price = parseFloat(result.value) || order.price;
							order_action.status = OrderStatus.ORCADA;
							break;
						case 'redirecionar':
							console.log(order.employee_id);
							order.employee_id = parseInt(result.value) || order.employee_id;
							console.log(order.employee_id);
							order_action.status = OrderStatus.REDIRECIONADA;
							break;
						case 'reparar':
							order_action.status = OrderStatus.ARRUMADA;
							order.repair_description = result.repair || '';
							order.instruction_description = result.instruction || '';
							break;
						default:
							break;
					}

					this.orderService.newAction(order, order_action.status!).subscribe({
						next: (response) => {
							alert('Alteração realizada com sucesso');
							this.loadOrders();
						},
						error: (error) => {
							alert(error);
						},
					});
				}
			}
		});
	}
	getStatusBorder(status: OrderStatus): string {
		const borderMap: Record<OrderStatus, string> = {
			[OrderStatus.ABERTA]: '10px solid #6c757d', // gray
			[OrderStatus.ORCADA]: '10px solid #8B4513', // brown
			[OrderStatus.REJEITADA]: '10px solid #dc3545', // red
			[OrderStatus.APROVADA]: '10px solid #ffc107', // yellow
			[OrderStatus.REDIRECIONADA]: '10px solid #800080', // purple
			[OrderStatus.ARRUMADA]: '10px solid #0d6efd', // blue
			[OrderStatus.PAGA]: '10px solid #fd7e14', // orange
			[OrderStatus.FINALIZADA]: '10px solid #198754', // green
		};
		return borderMap[status];
	}

	getStatusClass(status: OrderStatus): string {
		const statusClassMap = {
			[OrderStatus.ABERTA]: 'table-secondary',
			[OrderStatus.ORCADA]: 'table-brown',
			[OrderStatus.REJEITADA]: 'table-danger',
			[OrderStatus.APROVADA]: 'table-warning',
			[OrderStatus.REDIRECIONADA]: 'table-purple',
			[OrderStatus.ARRUMADA]: 'table-primary',
			[OrderStatus.PAGA]: 'table-orange',
			[OrderStatus.FINALIZADA]: 'table-success',
		};

		return statusClassMap[status] || '';
	}
}
