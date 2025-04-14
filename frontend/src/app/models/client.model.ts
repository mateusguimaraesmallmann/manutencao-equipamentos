import { User } from '.';

export class Client {
	constructor(
		public id: Number,
		public document: string,
		public zip_code: string,
		public city: string,
		public state: string,
		public number: string,
		public complement: string,
		public phone: string,
		public user: User | null,
	) {}
}
