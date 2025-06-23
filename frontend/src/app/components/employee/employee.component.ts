import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService, AuthService } from '../../services';
import { Employee } from '../../models';
import { EmployeeDialogComponent } from './input.compoment';

@Component({
	standalone: true,
	imports: [CommonModule],
	templateUrl: './employee.component.html',
	styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
	employees: Employee[] = [];

	constructor(
		private employeeService: EmployeeService,
		private activeModal: NgbModal,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.loadEmployees();
	}

	loadEmployees(): void {
		this.employeeService.getEmployees().subscribe({
			next: (response) => {
				this.employees = this.employeeService.employeesCache;
			},
		});
	}

	newEmployee() {
		this.activeModal.open(EmployeeDialogComponent).result.then(() => {
			this.loadEmployees();
		});
	}

	updateEmployee(id: any) {
		const modalRef = this.activeModal.open(EmployeeDialogComponent);
		modalRef.componentInstance.employeeId = id;

		modalRef.result.then((response: any) => {
			alert('Funcionário atualizado com sucesso');
			this.loadEmployees();
		});
	}

	deleteEmployee(id: any) {
		if (confirm('Tem certeza que deseja excluir este funcionário?')) {
			let employee = this.employeeService.employeesCache.find((emp) => {
				return emp.id === id;
			});

			this.employeeService.destroyEmployee(employee).subscribe(
				(response: any) => this.loadEmployees(),
				(error: any) => console.log('Erro ao excluir funcionário', error),
			);
		}
	}

	ableToDestroy(id: any): boolean {
		return (
			id !== this.authService.getUser()?.employee_id &&
			this.employeeService.employeesCache.length > 1
		);
	}
}
