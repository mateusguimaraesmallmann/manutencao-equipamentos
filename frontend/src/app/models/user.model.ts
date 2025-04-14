import { Employee, Client } from '.';

export class User {
	constructor(
		public id: Number,
		public name: string,
		public email: string,
		public role: Number,
		public employee_id: Number | null,
		public client_id: Number | null,
		public profile: Employee | Client | null,
	) {}
}
