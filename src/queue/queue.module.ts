import { Module } from "@nestjs/common";
import { FileProcessor } from "./file.processor";
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "../file/file.entity";

@Module({
    imports: [
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