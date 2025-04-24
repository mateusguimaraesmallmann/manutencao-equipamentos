import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../models';
import { CategoryService } from '../../../../services/category.service';

@Component({
	selector: 'app-order-creation',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './order-creation.component.html',
	styleUrl: './order-creation.component.css',
})
export class OrderCreationComponent implements OnInit {
	categories: Category[] = [];

	selectedCategory: any;
	equipmentDescription: string = '';
	defectDescription: string = '';

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe({
			next: (response) => {
				this.categories = response;
			},
		});
	}

	onSubmit() {
		alert('CRIANDO');
	}
}
