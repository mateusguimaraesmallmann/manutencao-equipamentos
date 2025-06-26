import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {
	FormGroup,
	ReactiveFormsModule,
	FormControl,
	Validators,
} from '@angular/forms';

import { EmployeeService } from '../../services';

@Component({
	template: `
		<div class="modal-header">
			<h5 class="modal-title">Formulário de Funcionário</h5>
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				(click)="onCancel()"
			></button>
		</div>
		<form [formGroup]="employeeForm" (submit)="onSubmit()">
			<div class="modal-body">
				<div class="mb-3">
					<label for="name" class="form-label">Nome:</label>
					<input
						type="text"
						id="name"
						name="name"
						class="form-control"
						formControlName="name"
					/>
					<div
						*ngIf="
							employeeForm.controls['name']?.invalid &&
							(employeeForm.controls['name']?.dirty ||
								employeeForm.controls['name']?.touched)
						"
					>
						<div
							*ngIf="employeeForm.controls['name']?.errors?.['required']"
							class="text-danger"
						>
							O campo não pode ser vazio
						</div>
					</div>
				</div>

				<div class="mb-3">
					<label for="email" class="form-label">Email:</label>
					<input
						type="email"
						id="email"
						name="email"
						class="form-control"
						formControlName="email"
					/>
					<div
						*ngIf="
							employeeForm.controls['email']?.invalid &&
							(employeeForm.controls['email']?.dirty ||
								employeeForm.controls['email']?.touched)
						"
					>
						<div
							*ngIf="employeeForm.controls['email']?.errors?.['required']"
							class="text-danger"
						>
							O campo não pode ser vazio
						</div>
					</div>
				</div>

				<div class="mb-3">
					<label for="birthday" class="form-label">Data nascimento:</label>
					<input
						type="date"
						id="birthday"
						name="birthday"
						class="form-control"
						formControlName="birthday"
					/>
					<div
						*ngIf="
							employeeForm.controls['birthday']?.invalid &&
							(employeeForm.controls['birthday']?.dirty ||
								employeeForm.controls['birthday']?.touched)
						"
					>
						<div
							*ngIf="employeeForm.controls['birthday']?.errors?.['required']"
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
					[disabled]="disableSubmit()"
				>
					Salvar
				</button>
			</div>
		</form>
	`,
	standalone: true,
	imports: [ReactiveFormsModule, CommonModule],
})
export class EmployeeDialogComponent {
	employeeId?: number | null = null;
	employeeForm: FormGroup = new FormGroup({
		name: new FormControl('', [Validators.required]),
		email: new FormControl('', [Validators.required]),
		birthday: new FormControl('', [Validators.required]),
	});
	currentEmployee: null | any = null;

	constructor(
		public activeModal: NgbActiveModal,
		private employeeService: EmployeeService,
	) {}

	ngOnInit(): void {
		if (this.employeeId !== null) {
			this.currentEmployee = this.employeeService.employeesCache.find(
				(employee) => employee.id === this.employeeId,
			);
			if (this.currentEmployee) {
				this.employeeForm.patchValue({
					name: this.currentEmployee.user.name,
					email: this.currentEmployee.user.email,
					birthday: this.currentEmployee.birthday,
				});
			}
		}
	}

	onCancel(): void {
		this.activeModal.dismiss();
	}

	onSubmit(): void {
		if (this.employeeId === null) {
			this.createEmployee();
		} else {
			this.updateEmployee();
		}
	}

	createEmployee(): void {
		this.employeeService
			.newEmployee(this.employeeForm.value)
			.subscribe((resp) => {
				this.activeModal.close();
			});
	}

	updateEmployee(): void {
		let empData = {
			...this.currentEmployee,
			birthday:
				this.employeeForm.value.birthday || this.currentEmployee.birthday,
			user: {
				...this.currentEmployee.user,
				name: this.employeeForm.value.name,
				email: this.employeeForm.value.email,
			},
		};

		this.employeeService.updateEmployee(empData).subscribe(() => {
			this.activeModal.close();
		});
	}

	disableSubmit(): boolean {
		if (this.employeeId == null) {
			return !this.employeeForm.valid;
		}
		return !this.employeeForm.touched && this.employeeForm.valid;
	}
}
