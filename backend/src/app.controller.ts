import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('/health')
	getStatus() {
		return { status: 200 };
	}
}
