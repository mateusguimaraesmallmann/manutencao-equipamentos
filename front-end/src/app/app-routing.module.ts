import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientSignUpComponent} from './pages/client-sign-up/client-sign-up.component';

const routes: Routes = [
  {path:'sign-up', component: ClientSignUpComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
