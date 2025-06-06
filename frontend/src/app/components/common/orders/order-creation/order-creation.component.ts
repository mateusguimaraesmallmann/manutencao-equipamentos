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

import { Router } from '@angular/router';

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
		private router: Router,
	) {
		this.ordersForm = this.fb.group({
			category_id: [null, Validators.required],
			equipment_description: ['', Validators.required],
			deffect_description: ['', Validators.required],
		});

		this.categories = [];
	}

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe((_) => {
			this.categories = this.categoryService.categoriesCache;
		});
	}

	onSubmit() {}

	save() {
		if (!this.ordersForm.valid) {
			console.log(this.ordersForm);
			this.ordersForm.markAllAsTouched();
			return;
		}

		let client_id = this.authService.getUser()?.client_id!;

		const new_order = new Order({
			...this.ordersForm.value,
			created_at: new Date(), //TODO - REMOVER AO INTEGRAR COM A API
			client_id,
		});

		if (new_order.valid(EntityMethods.CREATE)) {
			this.orderService.newOrder(new_order).subscribe((response) => {
				console.log(response);
				alert('Ordem de serviço criada');
				this.router.navigate(['/home']);
			});
		} else {
			alert('Ordem de serviço inválida');
		}
	}
}
