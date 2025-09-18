import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-navbar-funcionario',
  standalone: true,
  imports: [
            CommonModule, 
            RouterModule, 
            MatToolbarModule, 
            MatButtonModule, 
            MatIconModule
          ],
  templateUrl: './navbar-funcionario.component.html',
  styleUrls: ['./navbar-funcionario.component.css']
})
export class NavbarFuncionarioComponent {
  private router = inject(Router);

  get userName(): string {
    try { return JSON.parse(localStorage.getItem('currentUser') || '{}')?.nome ?? 'Funcionário'; }
    catch { return 'Funcionário'; }
  }

  logoff(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
