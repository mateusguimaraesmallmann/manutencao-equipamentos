import { Routes } from '@angular/router';
import {InicialComponent} from './pages/inicial/inicial.component';
import {ClientSignUpComponent} from './pages/client-sign-up/client-sign-up.component';

export const routes: Routes = [
  {path:'', component: InicialComponent, pathMatch: 'full'},
  {path:'sign-up', component: ClientSignUpComponent}
];
