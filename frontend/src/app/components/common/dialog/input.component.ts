import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'app-input-dialog',
	templateUrl: './input.component.html',
	styleUrl: './input.component.css',
	standalone: true,
	imports: [FormsModule],
})
export class InputDialogComponent {
	type: string | null = null;
	orderId: Number | null = null;
	value: string = '';

	constructor(public activeModal: NgbActiveModal) {}

	onCancel(): void {
		this.activeModal.dismiss();
	}

	onSubmit(): void {
		this.activeModal.close(this.value);
	}

	getTitle(): string {
		return this.type == 'orcar'
			? 'Valor do orçamento'
			: 'Redirecionar para funcionário';
	}
}
