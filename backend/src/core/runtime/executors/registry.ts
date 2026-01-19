import { NodeExecutor } from '../node';

export class ExecutorRegistry {
	private executors = new Map<string, NodeExecutor>();

	register(id: string, executor: NodeExecutor) {
		if (this.executors.has(id)) {
			throw new Error(`Executor already registered: ${id}`);
		}
		this.executors.set(id, executor);
	}

	get(id: string): NodeExecutor {
		const executor = this.executors.get(id);
		if (!executor) {
			throw new Error(`Executor not found: ${id}`);
		}
		return executor;
	}
}
