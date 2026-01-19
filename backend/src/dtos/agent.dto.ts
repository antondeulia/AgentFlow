import { IsArray, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AgentNodeDto {
	@ApiProperty()
	@IsString()
	id: string;

	@ApiProperty()
	@IsString()
	executor: string;

	@ApiProperty()
	@IsObject()
	config?: Record<string, any>;
}

export class AgentEdgeDto {
	@ApiProperty()
	@IsString()
	from: string;

	@ApiProperty()
	@IsString()
	to: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	condition?: string;
}

export class AgentDto {
	@ApiProperty()
	@IsString()
	id: string;

	@ApiProperty()
	@IsString()
	entry: string;

	@ApiProperty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AgentNodeDto)
	nodes: AgentNodeDto[];

	@ApiProperty()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => AgentEdgeDto)
	edges: AgentEdgeDto[];
}
