import { Context } from './context';

export type EdgeCondition = (context: Context) => boolean;

export interface Edge {
	from: string;
	to: string;
	condition?: EdgeCondition;
}
