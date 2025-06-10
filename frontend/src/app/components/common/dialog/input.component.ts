import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-input-dialog',
	templateUrl: './input.component.html',
	styleUrl: './input.component.css',
	standalone: true,
	imports: [FormsModule, CommonModule],
})
export class InputDialogComponent {
	type: string | null = null;
	orderId: Number | null = null;
	value: string = '';
	descriptions = {
		repair: '',
		instruction: '',
	};

	constructor(public activeModal: NgbActiveModal) {}

	onCancel(): void {
		this.activeModal.dismiss();
	}

	onSubmit(): void {
		if (this.type == 'reparar') {
			if (
				this.descriptions.repair == '' ||
				this.descriptions.instruction == ''
			) {
				alert('Preencha todos os dados');
				return;
			}
			this.activeModal.close({ ...this.descriptions, value: null });
		} else {
			this.activeModal.close({ value: this.value });
		}
	}

	getTitle(): string {
		switch (this.type) {
			case 'orcar':
				return 'Valor do orçamento';
			case 'redirectionar':
				return 'Redirecionar para funcionário';
			case 'reparar':
			default:
				return 'Ação inválida';
		}
	}
}
