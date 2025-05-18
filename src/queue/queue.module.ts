import { Module } from "@nestjs/common";
import { FileProcessor } from "./file.processor";
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        BullModule.forRoot({
            connection: {
                host: 'localhost',
                port: 6379
            }
        }),
        BullModule.registerQueue({
            name: 'file-processing'
        }),
        TypeOrmModule.forFeature([File]),
    ],
    controllers: [],
    providers: [FileProcessor],
    exports: [BullModule],
})
export class QueueModule {}