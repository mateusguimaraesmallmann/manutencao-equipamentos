import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { Category } from '../../models';

@Component({
	selector: 'categories',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './category.component.html',
	styleUrl: './category.component.css',
})
export class CategoryComponent {
	categories: Array<Category> = [];

	newCategory() {
		alert('Nova categoria');
	}
}
