import { ExecutionContext } from './context';

export type Executor = (context: ExecutionContext, config?: any) => Promise<void> | void;

const registry = new Map<string, Executor>();

export function registerExecutor(id: string, executor: Executor) {
	registry.set(id, executor);
}

export function getExecutor(id: string): Executor {
	const executor = registry.get(id);
	if (!executor) {
		throw new Error(`Executor not found: ${id}`);
	}
	return executor;
}
