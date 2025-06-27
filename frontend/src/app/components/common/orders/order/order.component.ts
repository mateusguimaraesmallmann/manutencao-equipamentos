import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputDialogComponent } from '../dialog/input.component';

import { Employee, Category, User, OrderStatus } from '../../../../models';

import {
	OrderService,
	EmployeeService,
	CategoryService,
	ClientService,
} from '../../../../services';

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
	loading: boolean = false;
	clientName: string = '-';
	forClient: boolean = false;

	constructor(
		private orderService: OrderService,
		private modal: NgbModal,
		private employeeService: EmployeeService,
		private categoryService: CategoryService,
		private clientService: ClientService,
		public activeModal: NgbActiveModal,
	) {}

	ngOnInit(): void {
		this.loading = true;

		forkJoin({
			order: this.orderService.getOrder(this.orderId!),
			employees: this.employeeService.getEmployeesFull(),
			categories: this.categoryService.getCategories(),
		})
			.pipe(
				switchMap(({ order, employees, categories }) => {
					this.order = order;
					return this.clientService.getUserFromClient(order.client_id).pipe(
						map((user) => ({
							order,
							employees,
							categories,
							clientName: user[0].name ?? '-',
						})),
					);
				}),
			)
			.subscribe({
				next: ({ order, employees, categories, clientName }) => {
					this.order = order;
					this.clientName = clientName;
					this.loading = false;
				},
				error: (err) => {
					this.order = null;
					this.loading = false;
				},
			});
	}

	getEmployeeName(employee_id: Number): string {
		const employee = this.employeeService.employeesCache.find(
			(e: Employee) => e.id == employee_id,
		);

		return employee?.user?.name ?? '-';
	}

	getCategoryName(category_id: any): string {
		const category = this.categoryService.categoriesCache.find(
			(c: Category) => c.id == category_id,
		);

		return category?.name ?? '-';
	}

	getClientName(client_id: number): Observable<string> {
		return this.clientService
			.getUserFromClient(client_id)
			.pipe(map((user: User) => user?.name ?? '-'));
	}

	approveOrder(): void {
		this.orderService.newAction(this.order, OrderStatus.APROVADA).subscribe({
			next: (response) => {
				alert('Orçamento aprovado com sucesso');
				this.activeModal.close();
			},
			error: (error) => {
				alert(error);
			},
		});
	}

	rejectOrder(): void {
		this.orderService.newAction(this.order, OrderStatus.REJEITADA).subscribe({
			next: (response) => {
				alert('Orçamento rejeitado');
				this.activeModal.close();
			},
			error: (error) => {
				alert(error);
			},
		});
	}
}
