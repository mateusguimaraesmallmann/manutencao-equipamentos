import { User } from '.';

export class Employee {
	constructor(
		public id: Number | null,
		public document: string,
		public active: boolean,
		public position: string,
		public access_level: Number,
		public user: User | null,
	) {}
}
