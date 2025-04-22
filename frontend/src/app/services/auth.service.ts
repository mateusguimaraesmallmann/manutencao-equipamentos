import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { API_URL } from './api';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private currentUser: User | null = null;

	constructor(private http: HttpClient) {}

	loggedIn(): Boolean {
		return this.currentUser != null;
	}

	login(email: string, password: string): Observable<any> {
		const loginUrl = `${API_URL}/login`;

		const data = { email, password };

		return this.http.post(loginUrl, data).pipe(
			tap((response) => {
				this.currentUser = response as User;
			}),
		);
	}

	getUser(): User | null {
		return this.currentUser;
	}

	logout(): void {
		console.log('LOGOUT');
		this.currentUser = null;
	}
}
