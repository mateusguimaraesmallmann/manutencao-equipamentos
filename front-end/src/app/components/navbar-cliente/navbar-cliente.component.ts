import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { HeaderComponent } from "../header/header.component"
import { Subscription } from 'rxjs';

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

  userName: string = 'Cliente';
  private sub?: Subscription;

  @Input() novaSolicitacao!: any

  ngOnInit(): void {
    this.auth.restoreFromStorage?.();

    this.sub = this.auth.user$.subscribe(user => {
      const nome = user?.nome?.trim();
      this.userName = nome ? nome.split(' ')[0] : 'Cliente';
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  logoff = () =>{
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}