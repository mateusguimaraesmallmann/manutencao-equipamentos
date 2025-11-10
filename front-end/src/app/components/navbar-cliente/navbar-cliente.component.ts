import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { HeaderComponent } from "../header/header.component"

@Component({
  selector: 'app-navbar-cliente',
  standalone: true,
  imports: [ CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, HeaderComponent ],
  templateUrl: './navbar-cliente.component.html',
  styleUrls: ['./navbar-cliente.component.css']
})
export class NavbarClienteComponent {
  private router = inject(Router);
  private auth = inject(AutenticacaoService);
  @Input() novaSolicitacao!: any

  get userName(): string {
    try { return JSON.parse(localStorage.getItem('auth_user') || '{}')?.nome ?? ''; }
    catch { return 'Funcionário'; }
  }

  logoff = () =>{
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}