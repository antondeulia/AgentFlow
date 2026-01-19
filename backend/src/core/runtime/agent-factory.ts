import { Agent } from './agent';
import { Node } from './node';
import { Edge } from './edge';
import { ExecutorRegistry } from './executors/registry';

export class AgentFactory {
	constructor(private registry: ExecutorRegistry) {}

	fromJson(json: any): Agent {
		const nodes = new Map<string, Node>();

		for (const n of json.nodes) {
			nodes.set(n.id, {
				id: n.id,
				executor: this.registry.get(n.executor),
			});
		}

		const edges: Edge[] = json.edges.map((e: any) => ({
			from: e.from,
			to: e.to,
			condition: e.condition
				? new Function('context', `return ${e.condition}`)
				: undefined,
		}));

		return {
			id: json.id,
			entryNodeId: json.entry,
			nodes,
			edges,
		};
	}
}
