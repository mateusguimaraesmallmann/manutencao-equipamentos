import { Category } from './category.model';
import { Client } from './client.model';
import { OrderStatus } from './order-status.enum';

export class Order {
	constructor(
		public id: Number,
		public client: Client,
		public category: Category,
		public created_at: Date,
		public equipment_description: string,
		public deffect_description: string,
		public status: OrderStatus,
		public price: Number,
	) {}
}
