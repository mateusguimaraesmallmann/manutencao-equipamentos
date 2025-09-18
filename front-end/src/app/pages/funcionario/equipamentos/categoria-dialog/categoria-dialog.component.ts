import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

type Data = { modo: 'novo' | 'editar'; nome?: string };

@Component({
  selector: 'app-categoria-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.modo === 'novo' ? 'Nova Categoria' : 'Editar Categoria' }}</h2>
    <form [formGroup]="form" (ngSubmit)="salvar()" class="dialog-body">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome" maxlength="60" required />
      </mat-form-field>

      <div class="actions">
        <button mat-stroked-button type="button" (click)="close()">Cancelar</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="form.invalid">Salvar</button>
      </div>
    </form>
  `,
  styles: [`
    .dialog-body { padding: 8px 24px 24px; }
    .w-full { width: 100%; }
    .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  `]
})
export class CategoriaDialogComponent {
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private ref: MatDialogRef<CategoriaDialogComponent>,
    fb: FormBuilder
  ) {
    this.form = fb.group({
      nome: [data.nome ?? '', [Validators.required, Validators.maxLength(60)]]
    });
  }

  salvar() {
    if (this.form.valid) this.ref.close(this.form.value.nome.trim());
  }
  close() { this.ref.close(); }
}
