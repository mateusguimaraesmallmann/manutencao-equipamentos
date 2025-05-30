import { OrderStatus } from './order-status.enum';

export class OrderAction {
	constructor(
		public id: number,
		public order_id: number,
		public employee_id: number,
		public created_at: Date,
		public status: OrderStatus,
	) {}
}
