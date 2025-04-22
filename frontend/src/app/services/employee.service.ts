import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { API_URL } from './api';

@Injectable({
	providedIn: 'root',
})
export class EmployeeService {
	constructor(private http: HttpClient) {}

	getProfile(employee_id: number): Observable<any> {
		const profileUrl = `${API_URL}/employees/${employee_id}`;

		console.log(profileUrl);

		return this.http
			.get(profileUrl)
			.pipe(tap((response) => console.log(response)));
	}
}
