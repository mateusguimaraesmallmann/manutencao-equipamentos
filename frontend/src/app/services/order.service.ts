import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { API_URL } from './api';
import { Order, OrderStatus } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
	constructor(private http: HttpClient) {}

	getOrders(): Observable<any> {
		return this.http.get(`${API_URL}/orders`);
	}

	getOrdersFromClient(client_id: number): Observable<any> {
		return this.http.get(`${API_URL}/orders?client_id=${client_id}`);
	}

	getOrdersFromEmployee(employee_id: number): Observable<any> {
		return this.http.get(`${API_URL}/orders?employee_id=${employee_id}`);
	}

	getOrder(id: number): Observable<any> {
		return this.http.get(`${API_URL}/orders/${id}`);
	}

	newOrder(order: Order): Observable<any> {
		const orderUrl = `${API_URL}/orders`;
		const actionUrl = `${API_URL}/order_actions`;

		return this.http.post(orderUrl, order).pipe(
			switchMap((created: any) => {
				const action = {
					employee_id: order.employee_id,
					created_at: new Date(),
					order_id: created.id,
					status: OrderStatus.ABERTA,
				};

				return this.http.post(actionUrl, action).pipe(
					switchMap((createdAction: any) => {
						const updated = {
							...created,
							status: OrderStatus.ABERTA,
							order_actions: [createdAction],
						};
						return this.http.put(`${orderUrl}/${created.id}`, updated);
					}),
				);
			}),
		);
	}

	updateOrder(order: Order): Observable<any> {
		return this.http.put(`${API_URL}/orders/${order.id}`, order);
	}

	newAction(order: Order, status: OrderStatus): Observable<any> {
		const actionUrl = `${API_URL}/order_actions`;

		const action = {
			employee_id: order.employee_id,
			created_at: new Date(),
			order_id: order.id,
			status,
		};

		return this.http.post(actionUrl, action).pipe(
			switchMap((createdAction: any) => {
				const updated = {
					...order,
					status,
					order_actions: [...(order.order_actions || []), createdAction],
				};
				return this.http.put(`${API_URL}/orders/${order.id}`, updated);
			}),
		);
	}
}
