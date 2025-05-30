import { OrderAction, OrderStatus, EntityMethods } from './index';

export class Order {
	public id: number | null;
	public client_id: number | null;
	public employee_id: number | null;
	public category_id: number | null;
	public created_at: Date | null;
	public equipment_description: string | null;
	public deffect_description: string | null;
	public status: OrderStatus | null;
	public price: Number | null;
	public order_actions: OrderAction[] | null;

	constructor(options?: {
		id?: number | null;
		client_id: number;
		employee_id?: number | null;
		category_id: number;
		created_at?: string | null;
		equipment_description: string;
		deffect_description: string;
		status?: OrderStatus;
		price?: Number | null;
		order_actions?: OrderAction[];
	}) {
		if (options == null || typeof options == 'undefined') {
			this.id = null;
			this.client_id = null;
			this.employee_id = null;
			this.category_id = null;
			this.created_at = null;
			this.equipment_description = null;
			this.deffect_description = null;
			this.status = null;
			this.price = null;
			this.order_actions = null;
		} else {
			this.id = options.id || null;
			this.client_id = options.client_id || null;
			this.employee_id = options.employee_id || null;
			this.category_id = options.category_id || null;
			this.created_at = options.created_at
				? new Date(options.created_at)
				: null;
			this.equipment_description = options.equipment_description || null;
			this.deffect_description = options.deffect_description || null;
			this.status = options.status || OrderStatus.ABERTA;
			this.price = options.price || null;
			this.order_actions = options.order_actions || [];
		}
	}

	valid(action: EntityMethods): boolean {
		let requiredFields = [
			'client_id',
			'category_id',
			'equipment_description',
			'deffect_description',
		];

		if (action == EntityMethods.UPDATE) {
			requiredFields.concat(['id', 'employee_id', 'status', 'created_at']);
		} else if (action == EntityMethods.DELETE) {
			requiredFields.push('id');
		}

		let valid = true;

		requiredFields.forEach((key) => {
			if (
				this[key as keyof Order] == null ||
				typeof this[key as keyof Order] == 'undefined'
			)
				valid = false;
		});

		return valid;
	}
}
