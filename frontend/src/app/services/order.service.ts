import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, pipe } from 'rxjs';
import { API_URL } from './api';
import { Order, OrderStatus } from '../models';

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

	newOrder(order: Order): Observable<any> {
		let order_url = `${API_URL}/orders`;
		let order_action_url = `${API_URL}/order_actions`;

		return this.http.post(order_url, order).pipe(
			switchMap((createdOrder: any) => {
				const action = {
					employee_id: order.employee_id,
					created_at: new Date(),
					order_id: createdOrder.id,
					status: OrderStatus.ABERTA,
				};

				return this.http.post(order_action_url, action).pipe(
					switchMap((createdAction: any) => {
						const updatedOrder = {
							...createdOrder,
							status: OrderStatus.ABERTA,
							order_actions: [createdAction],
						};

						return this.http.put(
							`${API_URL}/orders/${createdOrder.id}`,
							updatedOrder,
						);
					}),
				);
			}),
		);
	}

	updateOrder(order: Order): Observable<any> {
		let order_url = `${API_URL}/orders/${order.id}`;

		return this.http.put(order_url, order);
	}

	newAction(order: Order, status: OrderStatus): Observable<any> {
		let order_action_url = `${API_URL}/order_actions`;

		let action = {
			employee_id: order.employee_id,
			created_at: new Date(),
			order_id: order.id,
			status: status,
		};

		return this.http.post(order_action_url, action).pipe(
			switchMap((createdAction: any) => {
				const updatedOrder = {
					...order,
					status: status,
					order_actions: [...(order.order_actions || []), createdAction],
				};

				return this.http.put(`${API_URL}/orders/${order.id}`, updatedOrder);
			}),
		);
	}
}
