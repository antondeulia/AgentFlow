import { createContext } from './context';
import { registerExecutor } from './registry';
import { runGraph } from './runner';

registerExecutor('input.receive', ctx => {
	ctx.data.text = ctx.input;
});

registerExecutor('text.uppercase', ctx => {
	ctx.data.text = String(ctx.data.text).toUpperCase();
});

registerExecutor('output.log', ctx => {
	console.log('OUTPUT:', ctx.data.text);
});

const graph = {
	entry: 'A',
	nodes: {
		A: { id: 'A', executor: 'input.receive' },
		B: { id: 'B', executor: 'text.uppercase' },
		C: { id: 'C', executor: 'output.log' },
	},
	edges: [
		{ from: 'A', to: 'B' },
		{ from: 'B', to: 'C' },
	],
};

async function main() {
	const ctx = createContext('test');
	await runGraph(graph, ctx);

	console.log('LOGS:', ctx.logs);
}

main();
