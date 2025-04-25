import { Employee, Client } from '.';

export class User {
	constructor(
		public id: number,
		public name: string,
		public email: string,
		public role: number,
		public employee_id: number | null,
		public client_id: number | null,
		public profile: Employee | Client | null,
	) {}
}
