import { Routes } from '@angular/router';
import { HomeClienteComponent } from './paginas/cliente/home-cliente/home-cliente.component';
import { HomeFuncionarioComponent } from './paginas/funcionario/home-funcionario/home-funcionario.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './autocadastro/autocadastro/autocadastro.component';
import { EquipamentoComponent } from './paginas/equipamento/equipamento/equipamento.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { SolicitarManutencaoComponent } from './paginas/cliente/solicitar-manutencao/solicitar-manutencao.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { OrderCreationComponent } from './components/common/orders/order-creation/order-creation.component';
import { OrdersComponent } from './components/common/orders/orders.component';
import { RejeitarServicoComponent } from './paginas/cliente/rejeitar-servico/rejeitar-servico.component';

import { MostrarOrcamentoComponent } from './paginas/cliente/mostrar-orcamento/mostrar-orcamento.component';
import { EfetuarOrcamentoComponent } from './paginas/funcionario/efetuar-orcamento/efetuar-orcamento.component';

import { AprovarServicoClienteComponent } from './paginas/cliente/aprovar-servico-cliente/aprovar-servico-cliente.component';


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
		children: [
			{ path: 'categories', component: CategoryComponent },
			{ path: 'employees', component: EmployeeComponent },
			{ path: 'orders', component: OrdersComponent },
		],
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'order/new',
		component: OrderCreationComponent,
	},
	{
		path: 'cliente',
		component: HomeClienteComponent,
	},
	{
		path: 'rejeitar-servico',
		component: RejeitarServicoComponent
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
	},
	{
		path: 'aprovar-servico',
		component: AprovarServicoClienteComponent
	},

];
