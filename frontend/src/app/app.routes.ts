import { Routes } from '@angular/router';
import { HomeClienteComponent } from './paginas/cliente/home-cliente/home-cliente.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '**', component: LoginComponent }


    {
    path: 'cliente',
    component: HomeClienteComponent,

  },

];
