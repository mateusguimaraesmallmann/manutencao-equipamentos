import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models';
import { CategoryDialogComponent } from './input.component';

@Component({
	selector: 'categories-tag',
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
	templateUrl: './category.component.html',
	styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
	categories: Category[] = [];

	constructor(
		private categoryService: CategoryService,
		private activeModal: NgbModal,
	) {}

	ngOnInit(): void {
		this.loadCategories();
	}

	loadCategories(): void {
		this.categoryService.getCategories().subscribe({
			next: (response) => {
				this.categories = this.categoryService.categoriesCache;
			},
		});
	}

	newCategory() {
		this.activeModal.open(CategoryDialogComponent);
	}

	updateCategory(id: any) {
		const modalRef = this.activeModal.open(CategoryDialogComponent);
		modalRef.componentInstance.categoryId = id;

		modalRef.result.then((response: any) => {
			this.loadCategories();
		});
	}

	deleteCategory(id: any) {
		if (confirm(`Tem certeza que deseja excluir a categoria ${id}`)) {
			this.categoryService.destroyCategory(id).subscribe(
				(response) => this.loadCategories(),
				(error) => console.log('Error deletando categoria:', error),
			);
		}
	}
}
