import { Body, Controller, Post } from '@nestjs/common';
import { GraphsService } from './graphs.service';
import { CreateGraphDto } from './dtos/creeate-graph.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('graphs')
export class GraphsController {
	constructor(private readonly graphsService: GraphsService) {}

	@ApiOperation({ summary: 'Creates a graph' })
	@Post()
	create(@Body() dto: CreateGraphDto) {
		console.log(dto);
	}
}
