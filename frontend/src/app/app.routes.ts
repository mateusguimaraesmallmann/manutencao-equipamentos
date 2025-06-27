import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutocadastroComponent } from './components/registration/autocadastro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CategoryComponent } from './components/category/category.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { HomeComponent } from './components/home/home.component';
import { OrderCreationComponent } from './components/common/orders/order-creation/order-creation.component';
import { OrdersComponent } from './components/common/orders/orders.component';
import { ReportComponent } from './components/report/report.component';

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
			{ path: 'report', component: ReportComponent },
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
];
