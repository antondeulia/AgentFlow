import { Agent } from './agent';
import { Context } from './context';

export class Runtime {
	async run(agent: Agent, initialContext: Context): Promise<Context[]> {
		const queue: Array<{ nodeId: string; context: Context }> = [
			{ nodeId: agent.entryNodeId, context: initialContext },
		];

		const results: Context[] = [];

		while (queue.length > 0) {
			const { nodeId, context } = queue.shift()!;
			const node = agent.nodes.get(nodeId);
			if (!node) continue;

			const emitted = await node.executor.execute(context);

			for (const ctx of emitted) {
				const outgoing = agent.edges.filter(
					e => e.from === nodeId && (!e.condition || e.condition(ctx)),
				);

				if (outgoing.length === 0) {
					results.push(ctx);
					continue;
				}

				for (const edge of outgoing) {
					queue.push({ nodeId: edge.to, context: ctx });
				}
			}
		}

		return results;
	}
}
