import { Module } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileController } from "./file.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./file.entity";
import { QueueModule } from "queue/queue.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([File]),
        QueueModule,
    ],
    controllers: [FileController],
    providers: [FileService],
    exports: [FileService]
})
export class FileModule {}