import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

import { API_URL } from './api';
import { Category } from '../models';

@Injectable({
	providedIn: 'root',
})
export class CategoryService {
	workingCategory = {};
	categoriesCache: Array<Category> = [];

	constructor(private http: HttpClient) {}

	getCategories(): Observable<any> {
		let categoriesUrl = `${API_URL}/categories`;

		return this.http.get<Category[]>(categoriesUrl).pipe(
			tap({
				next: (response) => (this.categoriesCache = response),
				error: (error) => console.log(error),
			}),
		);
	}
}
