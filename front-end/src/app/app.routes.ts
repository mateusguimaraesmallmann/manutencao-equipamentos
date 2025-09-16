import { Routes } from '@angular/router';
import { InicialComponent } from './pages/inicial/inicial.component';
import { ClientSignUpComponent } from './pages/client-sign-up/client-sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { AutocadastroComponent } from './pages/autocadastro/autocadastro.component';
import { ClienteComponent } from './pages/pagina-cliente/pagina-cliente.component';
import { FuncionarioInicialComponent } from './pages/funcionario-inicial/funcionario-inicial.component';

export const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'inicial', component: InicialComponent },
  { path: 'sign-up', component: ClientSignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'pagina-cliente', component: ClienteComponent },
  {
    path: 'solicitacao-manutencao',
    loadComponent: () =>
      import('./pages/solicitacao-manutencao/solicitacao-manutencao.component')
        .then(m => m.SolicitacaoManutencaoComponent)
  },
  { path: 'funcionario', component: FuncionarioInicialComponent },
  {
    path: 'orcamento/:id',
    loadComponent: () =>
      import('./pages/efetuar-orcamento/efetuar-orcamento.component')
        .then(m => m.EfetuarOrcamentoComponent)
  },
  { path: '**', redirectTo: 'login' }
];
