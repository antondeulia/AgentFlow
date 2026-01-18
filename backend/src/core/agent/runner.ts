import { ExecutionContext } from './context';
import { getExecutor } from './registry';

export type GraphNode = {
	id: string;
	executor: string;
	config?: any;
};

export type GraphEdge = {
	from: string;
	to: string;
};

export type Graph = {
	entry: string;
	nodes: Record<string, GraphNode>;
	edges: GraphEdge[];
};

export async function runGraph(graph: Graph, context: ExecutionContext) {
	let currentNodeId = graph.entry;

	while (currentNodeId) {
		const node = graph.nodes[currentNodeId];
		if (!node) {
			throw new Error(`Node not found: ${currentNodeId}`);
		}

		const executor = getExecutor(node.executor);

		context.logs.push(`Running node ${node.id}`);
		await executor(context, node.config);

		const nextEdge = graph.edges.find(e => e.from === currentNodeId);

		if (!nextEdge) break;

		currentNodeId = nextEdge.to;
	}

	return context;
}
