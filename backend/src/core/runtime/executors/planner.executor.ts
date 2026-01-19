import { Context } from '../context';

export const plannerExecutor = {
	async execute(ctx: Context): Promise<Context[]> {
		return [
			{
				...ctx,
				meta: {
					...ctx.meta,
					needSearch: true,
					memory: [],
				},
			},
		];
	},
};
