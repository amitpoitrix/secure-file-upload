import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Job } from "bullmq";
import { FileStatus } from "../file/file.dto";
import { File } from "../file/file.entity";
import { Repository } from "typeorm";

@Processor('file-processing')
@Injectable()
export class FileProcessor extends WorkerHost{
    constructor(
        @InjectRepository(File) private readonly fileRepository: Repository<File>,
    ) {
        super();
    }

    async process(job: Job): Promise<any> {
        const fileId = job.data.fileId;
        const file = await this.fileRepository.findOne({
            where: {
                id: fileId
            }
        });

        if(!file) {
            throw new Error(`File with id ${fileId} not found`);
        }

        try {
            file.status = FileStatus.PROCESSING;
            await this.fileRepository.save(file);

            /** Simulating some background process */
            await new Promise((resolve) => setTimeout(resolve, 3000));

            file.status = FileStatus.PROCESSED;
            file.extractedData = 'Simulated result';
            await this.fileRepository.save(file);
        } catch (error) {
            file.status = FileStatus.FAILED;
            file.extractedData = `Error: ${error.message}`;
            await this.fileRepository.save(file);
        }
    }
}