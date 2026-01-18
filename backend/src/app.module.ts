import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaService } from './infra/db/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { GraphsModule } from './modules/graphs/graphs.module';
import { NodesModule } from './modules/nodes/nodes.module';
import { EdgesModule } from './modules/edges/edges.module';

@Module({
	imports: [ConfigModule.forRoot({ isGlobal: true }), GraphsModule, NodesModule, EdgesModule],
	controllers: [AppController],
	providers: [PrismaService],
})
export class AppModule {}
