import { Body, Controller, Post } from '@nestjs/common';
import { NodesService } from './nodes.service';
import { CreateNodeDto } from './dtos/create-node.dto';

@Controller('nodes')
export class NodesController {
	constructor(private readonly nodesService: NodesService) {}

	@Post()
	create(@Body() dto: CreateNodeDto) {
		console.log(dto);
	}
}
