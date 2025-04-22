import { Routes } from '@angular/router';
import { HomeClienteComponent } from './paginas/cliente/home-cliente/home-cliente.component';
import { HomeFuncionarioComponent } from './paginas/funcionario/home-funcionario/home-funcionario.component';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './autocadastro/autocadastro/autocadastro.component';
import { EquipamentoComponent } from './paginas/equipamento/equipamento/equipamento.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SolicitarManutencaoComponent } from './paginas/cliente/solicitar-manutencao/solicitar-manutencao.component';

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
		children: [{ path: 'orders', component: OrdersComponent }],
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
		component: SolicitarManutencaoComponent,
	},
];
