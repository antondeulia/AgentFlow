import { IsObject, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AgentDto } from './agent.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RunAgentDto {
	@ApiProperty()
	@IsString()
	query: string;

	@ApiProperty()
	@IsObject()
	@ValidateNested()
	@Type(() => AgentDto)
	agent: AgentDto;
}
