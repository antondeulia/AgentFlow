import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(PrismaService.name);

	constructor(private readonly config: ConfigService) {
		const adapter = new PrismaPg({
			connectionString: config.get<string>('DATABASE_URL'),
		});

		super({ adapter });
	}

	async onModuleInit() {
		const start = Date.now();

		this.logger.log('Connecting to database');

		try {
			await this.$connect();

			const ms = Date.now() - start;

			this.logger.log(`Database connection established (${ms}ms)`);
		} catch (error) {
			this.logger.error('Failed to connect to database: ', error);

			throw error;
		}

		await this.$connect();
	}

	async onModuleDestroy() {
		this.logger.log('Disconnection from the database');

		try {
			await this.$disconnect();

			this.logger.log('Database connection closed');
		} catch (error) {
			this.logger.error('Failed to disconnect from the database: ', error);

			throw error;
		}
	}
}
