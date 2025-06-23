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

	//	updateCategory(id: number, category: Category): Observable<any> {
	//		let categoryUrl = `${API_URL}/categories/${id}`;
	//
	//		return this.http.put<Category>(categoryUrl, category).pipe(
	//			tap({
	//				next: (response) => {
	//					this.resetCache();
	//				},
	//				error: (error) => console.log(error),
	//			}),
	//		);
	//	}
	//
	//	destroyCategory(id: number): Observable<any> {
	//		let categoryUrl = `${API_URL}/categories/${id}`;
	//
	//		return this.http.delete(categoryUrl).pipe(
	//			tap({
	//				next: (response) => {
	//					this.categoriesCache = this.categoriesCache.filter(
	//						(category) => category.id !== id,
	//					);
	//				},
	//				error: (error) => console.log(error),
	//			}),
	//		);
	//	}
}
