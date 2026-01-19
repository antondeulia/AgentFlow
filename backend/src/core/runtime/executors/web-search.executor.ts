import { Context } from '../context';

export const webSearchExecutor = {
	async execute(ctx: Context): Promise<Context[]> {
		const fakeResults = [
			'ИИ-агенты — это автономные системы принятия решений',
			'Они используются в чат-ботах, поиске, автоматизации',
			'Современные агенты комбинируют LLM и инструменты',
		];

		return [
			{
				...ctx,
				meta: {
					...ctx.meta,
					memory: [...(ctx.meta?.memory || []), ...fakeResults],
				},
			},
		];
	},
};
