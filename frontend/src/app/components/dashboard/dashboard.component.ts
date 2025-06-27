import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';

import { AuthService, EmployeeService } from '../../services';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
	constructor(
		private employeeService: EmployeeService,
		private authService: AuthService,
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		let employee_id = this.authService.getUser()?.employee_id as number;

		if (!employee_id) {
			this.authService.logout();
			this.router.navigate(['/login']);
		}

		this.employeeService.getProfile(employee_id).subscribe();

		if (this.router.url == '/dashboard') {
			this.router.navigate(['/dashboard/orders']);
		}
	}
}
