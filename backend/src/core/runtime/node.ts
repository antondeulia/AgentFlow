import { Context } from './context';

export interface NodeExecutor {
	execute(context: Context): Promise<Context[]>;
}

export interface Node {
	id: string;
	executor: NodeExecutor;
}
