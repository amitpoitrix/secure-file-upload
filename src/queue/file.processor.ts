import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'bullmq';
import { File } from '../file/file.entity';
import { FileStatus } from '../file/file.dto';

@Processor('file-processing')
@Injectable()
export class FileProcessor extends WorkerHost {
  private readonly logger = new Logger(FileProcessor.name);

  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {
    super();
  }

  override async process(job: Job): Promise<void> {
    const fileId = job.data.fileId;

    let file;
    try {
        file = await this.fileRepository.findOne({ where: { id: fileId } });
    } catch (err) {
        this.logger.error(`DB error: ${err.message}`);
    }

    if (!file) {
      this.logger.error(`File with ID ${fileId} not found`);
      return;
    }

    try {
      this.logger.log('Setting status to PROCESSING');
      file.status = FileStatus.PROCESSING;
      await this.fileRepository.save(file);
    
      this.logger.log('Simulating delay...');
      await new Promise((resolve) => setTimeout(resolve, 3000));
    
      this.logger.log('Saving final processed result...');
      file.status = FileStatus.PROCESSED;
      file.extractedData = 'Simulated result';
      await this.fileRepository.save(file);

      this.logger.log(`Finished processing file ID ${fileId}`);
    } catch (error) {
      file.status = FileStatus.FAILED;
      file.extractedData = `Error: ${error.message}`;
      await this.fileRepository.save(file);

      this.logger.error(`Error processing file ${fileId}: ${error.message}`);
    }
  }
}
