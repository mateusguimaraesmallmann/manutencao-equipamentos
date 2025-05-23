import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './api';

@Injectable({
	providedIn: 'root',
})
export class OrderService {
	constructor(private http: HttpClient) {}

	getOrdersFromClient(client_id: number): Observable<any> {
		let orders_url = `${API_URL}/orders?client_id=${client_id}`;

		return this.http.get(orders_url);
	}

	getOrdersFromEmployee(employee_id: number): Observable<any> {
		let orders_url = `${API_URL}/orders?employee_id=${employee_id}`;

		return this.http.get(orders_url);
	}

	getOrder(id: Number): Observable<any> {
		let order_url = `${API_URL}/orders/${id}`;

		return this.http.get(order_url);
	}
}
