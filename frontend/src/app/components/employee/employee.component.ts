import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { EmployeeService } from '../../services';
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
	) {}

	ngOnInit(): void {
		this.employeeService.getEmployees().subscribe({
			next: (response) => {
				this.employees = this.employeeService.employeesCache;
			},
		});
	}

	newEmployee() {
		this.activeModal.open(EmployeeDialogComponent);
	}

	//updateCategory(id: any) {
	//	const modalRef = this.activeModal.open(CategoryDialogComponent);
	//	modalRef.componentInstance.categoryId = id;

	//	modalRef.result.then((response: any) => {
	//		this.loadCategories();
	//	});
	//}

	//deleteCategory(id: any) {
	//	if (confirm(`Tem certeza que deseja excluir a categoria ${id}`)) {
	//		this.categoryService.destroyCategory(id).subscribe(
	//			(response) => this.loadCategories(),
	//			(error) => console.log('Error deletando categoria:', error),
	//		);
	//	}
	//}
}
