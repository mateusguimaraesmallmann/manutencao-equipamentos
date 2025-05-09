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
	categories: Array<Category> = [];

	constructor(private http: HttpClient) {}

	getCategories(): Observable<any> {
		let categoriesUrl = `${API_URL}/categories`;

		return this.http.get<Category[]>(categoriesUrl).pipe(
			tap({
				next: (response) => (this.categories = response),
				error: (error) => console.log(error),
			}),
		);
	}

	newCategory(category: Category): Observable<any> {
		let categoriesUrl = `${API_URL}/categories`;

		return this.http.post<Category>(categoriesUrl, category).pipe(
			tap({
				next: (response) => {
					this.categories.push(response);
				},
				error: (error) => console.log(error),
			}),
		);
	}		


}
