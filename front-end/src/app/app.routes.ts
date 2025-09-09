import { Routes } from '@angular/router';
import {InicialComponent} from './pages/inicial/inicial.component';
import {ClientSignUpComponent} from './pages/client-sign-up/client-sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AutocadastroComponent } from './pages/autocadastro/autocadastro.component';

export const routes: Routes = [
  {path:'', component: InicialComponent, pathMatch: 'full'},
  {path:'sign-up', component: ClientSignUpComponent},
  {path:'login', component: LoginComponent},
  {path:'autocadastro', component: AutocadastroComponent}
];
