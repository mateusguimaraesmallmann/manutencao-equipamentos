import { Routes } from '@angular/router';
import { InicialComponent } from './pages/cliente/inicial/inicial.component';
import { LoginComponent } from './pages/login/login.component';
import { AutocadastroComponent } from './pages/cliente/autocadastro/autocadastro.component';
import { ClienteComponent } from './pages/cliente/pagina-cliente/pagina-cliente.component';
import { SolicitacaoManutencaoComponent } from './pages/cliente/solicitacao-manutencao/solicitacao-manutencao.component';
import { FuncionarioInicialComponent } from './pages/funcionario/funcionario-inicial/funcionario-inicial.component';
import { EfetuarOrcamentoComponent } from './pages/funcionario/efetuar-orcamento/efetuar-orcamento.component';
import { EfetuarManutencaoComponent } from './pages/funcionario/efetuar-manutencao/efetuar-manutencao.component';
import { EquipamentosComponent } from './pages/funcionario/equipamentos/equipamentos.component';
import { FuncionariosComponent } from './pages/funcionario/funcionarios/funcionarios.component';
import { RelatoriosComponent } from './pages/funcionario/relatorios/relatorios.component';
import { SolicitacaoDetalheComponent } from './pages/cliente/solicitacao-detalhe/solicitacao-detalhe.component';


import { funcionarioGuard } from './guards/funcionario.guard';

export const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },

  { path: 'inicial', component: InicialComponent },
  { path: 'login', component: LoginComponent },
  { path: 'autocadastro', component: AutocadastroComponent },
  { path: 'pagina-cliente', component: ClienteComponent },
  { path: 'solicitacao-manutencao', component: SolicitacaoManutencaoComponent },
  { path: 'cliente/solicitacao/:id', component: SolicitacaoDetalheComponent },

  { path: 'funcionario', component: FuncionarioInicialComponent },
  { path: 'orcamento/:id', component: EfetuarOrcamentoComponent },
  { path: 'manutencao/:id', component: EfetuarManutencaoComponent },
  { path: 'equipamentos', component: EquipamentosComponent },
  { path: 'funcionarios', component: FuncionariosComponent, canMatch: [funcionarioGuard] },
  { path: 'relatorios', component: RelatoriosComponent },

  { path: '**', redirectTo: 'login' }
];

