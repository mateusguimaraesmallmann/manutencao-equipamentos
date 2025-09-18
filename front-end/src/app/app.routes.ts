import { Routes } from '@angular/router';
import { InicialComponent } from './pages/cliente/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { AutocadastroComponent } from './pages/cliente/autocadastro/autocadastro.component';
import { ClienteComponent } from './pages/cliente/pagina-cliente/pagina-cliente.component';
import { FuncionarioInicialComponent } from './pages/funcionario/funcionario-inicial/funcionario-inicial.component';
import { funcionarioGuard } from './guards/funcionario.guard';

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
    canMatch: [funcionarioGuard],
    loadComponent: () =>
      import('./pages/funcionario/efetuar-orcamento/efetuar-orcamento.component')
        .then(m => m.EfetuarOrcamentoComponent)
  },
  {
    path: 'manutencao/:id',
    canMatch: [funcionarioGuard],
    loadComponent: () =>
      import('./pages/funcionario/efetuar-manutencao/efetuar-manutencao.component')
        .then(m => m.EfetuarManutencaoComponent)
  },
  { path: '**', redirectTo: 'login' },
  {
    path: 'equipamentos',
    canMatch: [funcionarioGuard],
    loadComponent: () =>
      import('./pages/funcionario/equipamentos/equipamentos.component')
        .then(m => m.EquipamentosComponent)
  },
  {
    path: 'funcionarios',
    canMatch: [funcionarioGuard],
    loadComponent: () =>
      import('./pages/funcionario/funcionarios/funcionarios.component')
        .then(m => m.FuncionariosComponent)
  },
  {
    path: 'relatorios',
    canMatch: [funcionarioGuard],
    loadComponent: () =>
      import('./pages/funcionario/relatorios/relatorios.component')
        .then(m => m.RelatoriosComponent)
  },
  { path: '**', redirectTo: 'login' },
  
];
