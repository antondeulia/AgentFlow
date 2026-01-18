import { Body, Controller, Post } from '@nestjs/common';
import { EdgesService } from './edges.service';
import { CreateEdgeDto } from './dtos/create-edge.dto';

@Controller('edges')
export class EdgesController {
	constructor(private readonly edgesService: EdgesService) {}

	@Post()
	create(@Body() dto: CreateEdgeDto) {
		console.log(dto);
	}
}
