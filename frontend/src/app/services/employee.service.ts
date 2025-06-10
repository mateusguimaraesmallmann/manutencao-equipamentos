import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Employee } from '../models';

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
}
