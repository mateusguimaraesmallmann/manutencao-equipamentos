import { Routes } from '@angular/router';
import { InicialComponent } from './pages/cliente/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { AutocadastroComponent } from './pages/cliente/autocadastro/autocadastro.component';
import { ClienteComponent } from './pages/cliente/pagina-cliente/pagina-cliente.component';
import { FuncionarioInicialComponent } from './pages/funcionario/funcionario-inicial/funcionario-inicial.component';

export const routes: Routes = [

  //{ path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'inicial', component: InicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'pagina-cliente', component: ClienteComponent },
  {
    path: 'solicitacao-manutencao',
    loadComponent: () =>
      import('./pages/cliente/solicitacao-manutencao/solicitacao-manutencao.component')
        .then(m => m.SolicitacaoManutencaoComponent)
  },
  { path: 'funcionario', component: FuncionarioInicialComponent },
  {
    path: 'orcamento/:id',
    loadComponent: () =>
      import('./pages/funcionario/efetuar-orcamento/efetuar-orcamento.component')
        .then(m => m.EfetuarOrcamentoComponent)
  },
  { path: '**', redirectTo: 'login' },
  {
    path: 'manutencao/:id',
    loadComponent: () =>
      import('./pages/funcionario/efetuar-manutencao/efetuar-manutencao.component')
        .then(m => m.EfetuarManutencaoComponent)
  },
  { path: '**', redirectTo: 'login' }
  
];
