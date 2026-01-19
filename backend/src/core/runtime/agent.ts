import { Node } from './node';
import { Edge } from './edge';

export interface Agent {
	id: string;
	entryNodeId: string;
	nodes: Map<string, Node>;
	edges: Edge[];
}
