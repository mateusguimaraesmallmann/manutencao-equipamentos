import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { NavbarFuncionarioComponent } from '../../../components/navbar-funcionario/navbar-funcionario.component';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { FuncionarioDialogComponent } from './funcionario-dialog/funcionario-dialog.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-funcionarios',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatSnackBarModule, MatDialogModule, NavbarFuncionarioComponent, 
    TableModule
   ],
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent {
  private service = inject(FuncionariosService);
  private snack = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  displayedColumns = ['nome', 'email', 'nascimento', 'status', 'acao'];

  funcionarios: Signal<Funcionario[]> = toSignal(
    this.service.funcionarios$.pipe(
      map(list => list.slice().sort((a,b) => {
        if (a.ativo !== b.ativo) return a.ativo ? -1 : 1;
        return a.nome.localeCompare(b.nome);
      }))
    ),
    { initialValue: [] }
  );

  adicionar() {
    const ref = this.dialog.open(FuncionarioDialogComponent, { data: { modo: 'novo' } });
    ref.afterClosed().subscribe((payload?: {nome:string;email:string;dataNascimento:string;senha:string}) => {
      if (!payload) return;
      this.service.criar(payload).subscribe(ok => {
        this.snack.open(ok ? 'Funcionário criado.' : 'E-mail já existente.', 'OK', { duration: 2500 });
      });
    });
  }

  editar(f: Funcionario) {
    const ref = this.dialog.open(FuncionarioDialogComponent, { data: { modo: 'editar', funcionario: f } });
    ref.afterClosed().subscribe((payload?: {nome:string;dataNascimento:string;senha?:string}) => {
      if (!payload) return;
      this.service.atualizar(f.id, payload).subscribe(ok => {
        this.snack.open(ok ? 'Funcionário atualizado.' : 'Falha ao atualizar.', 'OK', { duration: 2500 });
      });
    });
  }

  remover(f: Funcionario) {
    const ok = confirm(`Remover o funcionário "${f.nome}"?`);
    if (!ok) return;
    this.service.remover(f.id).subscribe(done => {
      this.snack.open(done ? 'Funcionário removido.' : 'Não é possível remover (talvez seja você ou o último ativo).', 'OK', { duration: 3000 });
    });
  }

  reativar(f: Funcionario) {
    this.service.reativar(f.id).subscribe(done => {
      this.snack.open(done ? 'Funcionário reativado.' : 'Falha ao reativar.', 'OK', { duration: 2500 });
    });
  }

}