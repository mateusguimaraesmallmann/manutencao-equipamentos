import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService, EmployeeService } from '../../services';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	constructor(
		private employeeService: EmployeeService,
		private authService: AuthService,
		private router: Router,
	) {
		let employee_id = this.authService.getUser()?.employee_id as number;

		if (!employee_id) {
			this.authService.logout();
			this.router.navigate(['/login']);
		}

		this.employeeService.getProfile(employee_id).subscribe();
	}
}
