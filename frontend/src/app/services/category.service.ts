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

	resetCache(): void {
		this.categoriesCache = [];
		this.getCategories().subscribe();
	}

	getCategories(): Observable<any> {
		let categoriesUrl = `${API_URL}/categories`;

		return this.http.get<Category[]>(categoriesUrl).pipe(
			tap({
				next: (response) => (this.categoriesCache = response),
				error: (error) => console.log(error),
			}),
		);
	}

	newCategory(newCategory: Category): Observable<Category> {
		let categoryUrl = `${API_URL}/categories`;

		return this.http.post<Category>(categoryUrl, newCategory).pipe(
			tap({
				next: (response) => {
					this.categoriesCache.push(response);
				},
				error: (error) => console.log(error),
			}),
		);
	}

	updateCategory(id: number, category: Category): Observable<any> {
		let categoryUrl = `${API_URL}/categories/${id}`;

		return this.http.put<Category>(categoryUrl, category).pipe(
			tap({
				next: (response) => {
					this.resetCache();
				},
				error: (error) => console.log(error),
			}),
		);
	}

	destroyCategory(id: number): Observable<any> {
		let categoryUrl = `${API_URL}/categories/${id}`;

		return this.http.delete(categoryUrl).pipe(
			tap({
				next: (response) => {
					this.categoriesCache = this.categoriesCache.filter(
						(category) => category.id !== id,
					);
				},
				error: (error) => console.log(error),
			}),
		);
	}
}
