import { Routes } from '@angular/router';
import { HomeClienteComponent } from './paginas/cliente/home-cliente/home-cliente.component';
import { HomeFuncionarioComponent } from './paginas/funcionario/home-funcionario/home-funcionario.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './autocadastro/autocadastro/autocadastro.component';
import { EquipamentoComponent } from './paginas/equipamento/equipamento/equipamento.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SolicitarManutencaoComponent } from './paginas/cliente/solicitar-manutencao/solicitar-manutencao.component';
import { MostrarOrcamentoComponent } from './paginas/cliente/mostrar-orcamento/mostrar-orcamento.component';
import { EfetuarOrcamentoComponent } from './paginas/funcionario/efetuar-orcamento/efetuar-orcamento.component';


export const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent,
	},
	{
		path: 'autocadastro',
		component: AutocadastroComponent,
	},
	{
		path: 'dashboard',
		component: DashboardComponent,
	},
	{
		path: 'cliente',
		component: HomeClienteComponent,
	},
	{
		path: 'funcionario',
		component: HomeFuncionarioComponent,
	},
	{
		path: 'equipamento',
		component: EquipamentoComponent,
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'solicitar-manutencao',
		component: SolicitarManutencaoComponent
	},
	{
		path: 'mostrar-orcamento',
		component: MostrarOrcamentoComponent
	},
	{
		path: 'efetuar-orcamento',
		component: EfetuarOrcamentoComponent
	}
];
