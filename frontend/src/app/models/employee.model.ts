import { User } from '.';

export class Employee {
	constructor(
		public id: Number | null,
		public birthday: string,
		public user: User,
	) {}
}
