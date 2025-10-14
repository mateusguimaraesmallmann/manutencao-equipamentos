import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Funcionario } from '../../../../shared/models/funcionario.model';

type Data =
  | { modo: 'novo' }
  | { modo: 'editar'; funcionario: Funcionario };

@Component({
  selector: 'app-funcionario-dialog',
  standalone: true,
    imports: [ CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, provideNativeDateAdapter()
  ],
  template: `
    <h2 mat-dialog-title>{{ data.modo === 'novo' ? 'Novo Funcionário' : 'Editar Funcionário' }}</h2>

    <form [formGroup]="form" (ngSubmit)="salvar()" class="dialog-body">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome" required maxlength="120" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>E-mail (login)</mat-label>
        <input matInput formControlName="email" type="email" [readonly]="isEditar" required />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Data de nascimento</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="dataNascimento" placeholder="aaaa-mm-dd" required />
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Senha {{ isEditar ? '(deixe em branco p/ manter)' : '' }}</mat-label>
        <input matInput formControlName="senha" type="password" [required]="!isEditar" minlength="4" />
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

export class FuncionarioDialogComponent {
  isEditar!: boolean;
  form: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Data,
    private ref: MatDialogRef<FuncionarioDialogComponent>,
    fb: FormBuilder
  ) {
    this.isEditar = data.modo === 'editar';

    const f = this.isEditar ? (data as any).funcionario as Funcionario : undefined;

    this.form = fb.group({
      nome: [f?.nome ?? '', [Validators.required, Validators.maxLength(120)]],
      email: [f?.email ?? '', [Validators.required, Validators.email]],
      dataNascimento: [f?.dataNascimento ? new Date(f.dataNascimento) : null, [Validators.required]],
      senha: ['']
    });
  }

  salvar() {
    if (this.form.invalid) return;

    const v = this.form.value as { nome: string; email?: string; dataNascimento: Date | null; senha?: string };

    const data = v.dataNascimento instanceof Date && !isNaN(v.dataNascimento.getTime()) ? v.dataNascimento.toISOString().slice(0, 10) : null;

    if (this.isEditar) {
      this.ref.close({ nome: v.nome.trim(), dataNascimento: data });
    } else {
      this.ref.close({ nome: v.nome.trim(), email: v.email!.trim(), dataNascimento: data, senha: v.senha! });
    }
  }

  close() { this.ref.close(); }

}