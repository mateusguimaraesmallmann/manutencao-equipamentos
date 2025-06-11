import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	ReactiveFormsModule,
	FormControl,
	Validators,
} from '@angular/forms';

import { CategoryService } from '../../services';

@Component({
	template: `
		<div class="modal-header">
			<h5 class="modal-title">Formulário de Categoria</h5>
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				(click)="onCancel()"
			></button>
		</div>
		<form [formGroup]="categoryForm" (submit)="onSubmit()">
			<div class="modal-body">
				<div class="mb-3">
					<label for="name" class="form-label">Nome da categoria:</label>
					<input
						type="text"
						id="name"
						name="name"
						class="form-control"
						formControlName="name"
						required
					/>
					<div
						*ngIf="
							categoryForm.controls['name']?.invalid &&
							(categoryForm.controls['name']?.dirty ||
								categoryForm.controls['name']?.touched)
						"
					>
						<div
							*ngIf="categoryForm.controls['name']?.errors?.['required']"
							class="text-danger"
						>
							O campo não pode ser vazio
						</div>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button
					type="submit"
					class="btn btn-primary"
					[disabled]="categoryForm.invalid"
				>
					Salvar
				</button>
			</div>
		</form>
	`,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
})
export class CategoryDialogComponent {
	value: string = '';
	categoryId?: number | null = null;
	categoryForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
	});

	constructor(
		public activeModal: NgbActiveModal,
		private categoryService: CategoryService,
	) {}

	ngOnInit(): void {
		if (this.categoryId !== null) {
			const category = this.categoryService.categoriesCache.find(
				(category) => category.id === this.categoryId,
			);
			if (category) {
				this.categoryForm.patchValue(category);
			}
		}
	}

	onCancel(): void {
		this.activeModal.dismiss();
	}

	onSubmit(): void {
		if (!this.categoryForm.valid) {
			this.categoryForm.markAllAsTouched();
			return;
		}

		if (this.categoryId == null) {
			this.createCategory();
		} else {
			this.updateCategory();
		}
	}

	createCategory(): void {
		this.categoryService
			.newCategory(this.categoryForm.value)
			.subscribe((response) => {
				this.activeModal.close(response);
			});
	}

	updateCategory(): void {
		let category = this.categoryForm.value;
		category.id = this.categoryId!;

		this.categoryService
			.updateCategory(category.id, category)
			.subscribe((response: any) => {
				this.activeModal.close();
			});
	}
}
