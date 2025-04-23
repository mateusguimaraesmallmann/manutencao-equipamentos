import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Category } from '../../models';
import { CategoryService } from '../../services/category.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'categories-tag',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './category.component.html',
	styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
	categories: Category[] = [];

	constructor(private categoryService: CategoryService) {}

	ngOnInit(): void {
		this.categoryService.getCategories().subscribe({
			next: (response) => {
				this.categories = this.categoryService.categories;
			},
		});
	}

	newCategory() {
		alert('Nova categoria');
	}
}
