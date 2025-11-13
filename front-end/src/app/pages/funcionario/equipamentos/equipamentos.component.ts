import { Component, inject, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NavbarFuncionarioComponent } from '../../../components/navbar-funcionario/navbar-funcionario.component';

import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { CategoriasService } from '../../../services/categorias.service';
import { Categoria } from '../../../shared/models/categoria.model';
import { CategoriaDialogComponent } from './categoria-dialog/categoria-dialog.component';

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    NavbarFuncionarioComponent,
    CategoriaDialogComponent
  ],
  templateUrl: './equipamentos.component.html',
  styleUrls: ['./equipamentos.component.css']
})
export class EquipamentosComponent {
  private service = inject(CategoriasService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  displayedColumns = ['nome', 'status', 'acao'];

  categoriasSig: Signal<Categoria[]> = toSignal(
    this.service.categorias$.pipe(
      map(list =>
        list.slice().sort((a, b) => {
          if (a.ativo !== b.ativo) return a.ativo ? -1 : 1;
          return a.nome.localeCompare(b.nome);
        })
      )
    ),
    { initialValue: [] }
  );

  adicionar() {
    const ref = this.dialog.open(CategoriaDialogComponent, { data: { modo: 'novo' } });
    ref.afterClosed().subscribe((nome?: string) => {
      if (!nome) return;
      this.service.criar(nome).subscribe((res) => {
        if (res) this.snack.open('Categoria criada.', 'OK', { duration: 2000 });
        else this.snack.open('Nome já existente.', 'OK', { duration: 2500 });
      });
    });
  }

  editar(c: Categoria) {
    const ref = this.dialog.open(CategoriaDialogComponent, { data: { modo: 'editar', nome: c.nome } });
    ref.afterClosed().subscribe((nome?: string) => {
      if (!nome || nome === c.nome) return;
      this.service.atualizar(c.id, nome).subscribe((res) => {
        if (res) this.snack.open('Categoria atualizada.', 'OK', { duration: 2000 });
        else this.snack.open('Não foi possível atualizar (nome duplicado?).', 'OK', { duration: 2500 });
      });
    });
  }

  remover(c: Categoria) {
    const ok = confirm(`Remover a categoria "${c.nome}"?`);
    if (!ok) return;
    this.service.remover(c.id).subscribe(done => {
      if (done) this.snack.open('Categoria removida (inativada).', 'OK', { duration: 2000 });
    });
  }

  reativar(c: Categoria) {
    this.service.reativar(c.id).subscribe(done => {
      if (done) this.snack.open('Categoria reativada.', 'OK', { duration: 2000 });
    });
  }
}