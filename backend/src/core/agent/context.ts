export type ExecutionContext = {
	input: any;
	data: Record<string, any>;
	logs: string[];
};

export function createContext(input: any): ExecutionContext {
	return {
		input,
		data: {},
		logs: [],
	};
}
