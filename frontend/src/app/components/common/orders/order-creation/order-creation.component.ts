import { Component, OnInit } from '@angular/core';
import { Category, Order, EntityMethods } from '../../../../models';
import {
	AuthService,
	CategoryService,
	OrderService,
} from '../../../../services';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-order-creation',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule],
	templateUrl: './order-creation.component.html',
	styleUrl: './order-creation.component.css',
})
export class OrderCreationComponent implements OnInit {
	categories: Array<Category>;
	ordersForm: FormGroup;
	editing: boolean = false;

	constructor(
		private categoryService: CategoryService,
		private orderService: OrderService,
		private authService: AuthService,
		private fb: FormBuilder,
	) {
		this.ordersForm = this.fb.group({
			category_id: [null, Validators.required, Validators.min(1)],
			equipment_description: ['', Validators.required],
			deffect_description: ['', Validators.required],
		});

		this.categories = [];
	}

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe((_) => {
			this.categories = this.categoryService.categoriesCache;
			console.log(this.categories);
		});
	}

	onSubmit() {}

	save() {
		let client_id = this.authService.getUser()?.client_id!;

		const new_order = new Order({
			...this.ordersForm.value,
			client_id,
		});

		if (new_order.valid(EntityMethods.CREATE)) {
			this.orderService.newOrder(new_order).subscribe((response) => {
				console.log(response);
			});
		} else {
			alert('Ordem de serviço inválida');
		}
	}
}
