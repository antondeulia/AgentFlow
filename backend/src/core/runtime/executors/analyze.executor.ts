import { Context } from '../context';

export const analyzeExecutor = {
	async execute(ctx: Context): Promise<Context[]> {
		const enoughData = (ctx.meta?.memory?.length || 0) >= 3;

		return [
			{
				...ctx,
				meta: {
					...ctx.meta,
					needMoreData: !enoughData,
				},
			},
		];
	},
};
