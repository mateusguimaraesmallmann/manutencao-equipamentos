import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, switchMap, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Employee, User } from '../models';

import { API_URL } from './api';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	employeesCache: Array<Employee> = [];
	constructor(private http: HttpClient) {}

	getProfile(employee_id: number): Observable<any> {
		const profileUrl = `${API_URL}/employees/${employee_id}`;

		return this.http.get(profileUrl);
	}

	getEmployeesFull(): Observable<any> {
		const employessFullUrl = `${API_URL}/employees_full`;

		return this.http.get<Employee[]>(employessFullUrl).pipe(
			tap((response) => {
				this.employeesCache = response;
			}),
		);
	}

	getEmployees(): Observable<Employee[]> {
		const employeesUrl = `${API_URL}/employees`;

		return this.http.get<any[]>(employeesUrl).pipe(
			switchMap((employees) =>
				forkJoin(
					employees.map((emp: any) =>
						this.http
							.get<User>(`${API_URL}/users/${emp.user_id}`)
							.pipe(
								map((user: any) => new Employee(emp.id, emp.birthday, user)),
							),
					),
				),
			),
			tap((response) => {
				this.employeesCache = response;
			}),
		);
	}

	newEmployee(employeeData: any): Observable<any> {
		let employeeUrl = `${API_URL}/new_employee`;

		return this.http.post(employeeUrl, employeeData);
	}

	updateEmployee(emp: any): Observable<any> {
		let employeeUrl = `${API_URL}/employees/${emp.id}`;
		let userUrl = `${API_URL}/users/${emp.user.id}`;

		let userData = { ...emp.user };

		let empData = { ...emp, user_id: emp.user.id };
		delete empData.user;

		return forkJoin([
			this.http.put(employeeUrl, empData),
			this.http.put(userUrl, userData),
		]).pipe(
			map(([employeeResponse, userResponse]) => {
				({
					employee: employeeResponse,
					user: userResponse,
				});
			}),
		);
	}

	destroyEmployee(employee: any): Observable<any> {
		let employeeUrl = `${API_URL}/employees/${employee.id}`;
		let userUrl = `${API_URL}/users/${employee.user.id}`;

		return this.http.get(`${API_URL}/users/${employee.user.id}`).pipe(
			switchMap((user: any) => {
				const requests: Observable<any>[] = [this.http.delete(employeeUrl)];

				if (user.client_id === null) {
					requests.push(this.http.delete(userUrl));
				} else {
					const userData = { ...user, role: 1, employee_id: null };
					requests.push(this.http.put(userUrl, userData));
				}

				return forkJoin(requests).pipe(
					map(([employeeResponse, userResponse]) => ({
						employee: employeeResponse,
						user: userResponse,
					})),
				);
			}),
		);
	}
}
