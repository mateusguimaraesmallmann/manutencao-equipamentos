import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../models';
import { Employee } from '../models/employee.model';

import { API_URL } from './api';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private http: HttpClient) {}

	getProfile(employee_id: number): Observable<any> {
		const profileUrl = `${API_URL}/employees/${employee_id}`;

		return this.http.get(profileUrl);
	}

	getEmployeesFull(): Observable<any> {
		const employessFullUrl = `${API_URL}/employees_full`;

		return this.http.get(employessFullUrl);
	}

	addEmployee(employee: Employee): Observable<any> {
		const addEmployeeUrl = `${API_URL}/employees`;

		return this.http.post(addEmployeeUrl, employee);
	}

}
