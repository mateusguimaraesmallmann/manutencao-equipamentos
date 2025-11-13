import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { HeaderComponent } from "../header/header.component";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-funcionario',
  standalone: true,
  imports: [ CommonModule, RouterModule, HeaderComponent ],
  templateUrl: './navbar-funcionario.component.html',
  styleUrls: ['./navbar-funcionario.component.css']
})
export class NavbarFuncionarioComponent {
  private router = inject(Router);
  private auth = inject(AutenticacaoService);

  userName: string = 'Funcionário';
  private sub?: Subscription;

  ngOnInit(): void {
    this.auth.restoreFromStorage?.();

    this.sub = this.auth.user$.subscribe(user => {
      const nome = user?.nome?.trim();
      this.userName = nome ? nome.split(' ')[0] : 'Funcionário';
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  logoff = () => {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}