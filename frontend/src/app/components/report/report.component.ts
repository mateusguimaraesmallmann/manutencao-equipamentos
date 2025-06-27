import { Component } from '@angular/core';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrderService } from '../../services';
import { Order, OrderStatus } from '../../models';

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css'],
	imports: [CommonModule, FormsModule],
	standalone: true,
	providers: [DatePipe],
})
export class ReportComponent {
	startDate: string;
	endDate: string;
	totalAmount: number = 0;
	isLoading: boolean = false;
	errorMessage: string | null = null;
	reportGenerated: boolean = false;

	constructor(
		private orderService: OrderService,
		private datePipe: DatePipe,
	) {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - 30);

		this.startDate = this.datePipe.transform(startDate, 'yyyy-MM-dd') || '';
		this.endDate = this.datePipe.transform(endDate, 'yyyy-MM-dd') || '';
	}

	generateReport(): void {
		if (!this.startDate || !this.endDate) {
			this.errorMessage = 'Please select both start and end dates';
			return;
		}

		if (new Date(this.startDate) > new Date(this.endDate)) {
			this.errorMessage = 'Start date must be before end date';
			return;
		}

		this.isLoading = true;
		this.errorMessage = null;
		this.totalAmount = 0;

		this.orderService.getOrders().subscribe({
			next: (orders) => {
				this.processOrders(orders);
				this.isLoading = false;
				this.reportGenerated = true;
				console.log(orders);
			},
			error: (err) => {
				this.errorMessage = 'Error fetching orders. Please try again.';
				this.isLoading = false;
				console.error(err);
			},
		});
	}

	private processOrders(orders: Order[]): void {
		const startDate = new Date(this.startDate);
		const endDate = new Date(this.endDate);
		endDate.setHours(23, 59, 59, 999);

		this.totalAmount = orders
			.filter(
				(order) =>
					(order.status === OrderStatus.FINALIZADA ||
						order.status === OrderStatus.PAGA) &&
					order.price !== null &&
					order.created_at !== null &&
					new Date(order.created_at) >= startDate &&
					new Date(order.created_at) <= endDate,
			)
			.reduce((sum, order) => sum + Number(order.price), 0);
	}

	resetReport(): void {
		this.totalAmount = 0;
		this.reportGenerated = false;
		this.errorMessage = null;
	}
}
