import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-navbar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeaderComponent
],
  templateUrl: './navbar-funcionario.component.html',
  styleUrls: ['./navbar-funcionario.component.css']
})
export class NavbarFuncionarioComponent {
  private router = inject(Router);
  private auth = inject(AutenticacaoService);

  get userName(): string {
    try { return JSON.parse(localStorage.getItem('currentUser') || '{}')?.nome ?? 'Funcionário'; }
    catch { return 'Funcionário'; }
  }

  logoff = () => {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
