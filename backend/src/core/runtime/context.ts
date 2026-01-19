export type ContextStatus = 'ACTIVE' | 'SUSPENDED' | 'HALTED';

export interface Context {
	id: string;
	payload: any;
	status: ContextStatus;
	meta?: {
		memory?: any[];
		[key: string]: any;
	};
}
