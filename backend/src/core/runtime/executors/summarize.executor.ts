import { Context } from '../context';

export const summarizeExecutor = {
	async execute(ctx: Context): Promise<Context[]> {
		const summary = (ctx.meta?.memory || []).join('. ') + '.';

		return [
			{
				...ctx,
				payload: summary,
				status: 'HALTED',
			},
		];
	},
};
