import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Client, User } from '../models';

import { API_URL } from './api';

@Injectable({
	providedIn: 'root',
})
export class ClientService {
	constructor(private http: HttpClient) {}

	getUserFromClient(client_id: number): Observable<any> {
		return this.http.get<User>(`${API_URL}/users?client_id=${client_id}`);
	}
}
