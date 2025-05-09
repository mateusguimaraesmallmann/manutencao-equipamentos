import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
