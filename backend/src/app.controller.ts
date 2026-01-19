// src/app.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { Runtime } from './core/runtime';
import { AgentFactory } from './core/runtime/agent-factory';
import { ExecutorRegistry } from './core/runtime/executors/registry';
import { plannerExecutor } from './core/runtime/executors/planner.executor';
import { webSearchExecutor } from './core/runtime/executors/web-search.executor';
import { analyzeExecutor } from './core/runtime/executors/analyze.executor';
import { summarizeExecutor } from './core/runtime/executors/summarize.executor';
import { ApiOperation } from '@nestjs/swagger';
import { RunAgentDto } from './dtos/run-agent.dto';

// executors

@Controller()
export class AppController {
	private registry: ExecutorRegistry;
	private factory: AgentFactory;
	private runtime: Runtime;

	constructor() {
		// 1️⃣ создаём registry
		this.registry = new ExecutorRegistry();

		// 2️⃣ регистрируем ВСЕ доступные executor’ы
		this.registry.register('planner', plannerExecutor);
		this.registry.register('web_search', webSearchExecutor);
		this.registry.register('analyze', analyzeExecutor);
		this.registry.register('summarize', summarizeExecutor);

		// 3️⃣ создаём factory и runtime
		this.factory = new AgentFactory(this.registry);
		this.runtime = new Runtime();
	}

	@ApiOperation({ summary: 'Check status' })
	@Get('/status')
	getStatus() {
		return { status: 200 };
	}

	@ApiOperation({ summary: 'Test Agent' })
	@Post('/run-agent')
	async run(@Body() dto: RunAgentDto) {
		const agent = this.factory.fromJson(dto.agent);

		const result = await this.runtime.run(agent, {
			id: 'ctx-1',
			payload: dto.query,
			status: 'ACTIVE',
			meta: {},
		});

		return { result: result[0]?.payload };
	}
}
