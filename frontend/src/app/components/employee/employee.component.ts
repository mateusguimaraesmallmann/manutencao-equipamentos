import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeService } from '../../services';
import { Employee } from '../../models';

@Component({
	selector: 'app-employee',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './employee.component.html',
	styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
	employees: Employee[] = [];

	constructor(private employeeService: EmployeeService) {}

	ngOnInit(): void {
		this.employeeService.getEmployeesFull().subscribe({
			next: (response) => {
				this.employees = response;
			},
		});
	}

	newEmployee() {
		alert('Novo funcionário');
	}
}
