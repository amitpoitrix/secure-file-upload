import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./file.entity";
import { Repository } from "typeorm";
import { FileStatus, UploadFileDto } from "./file.dto";
import { InjectQueue } from "@nestjs/bullmq";
import { Queue } from "bullmq";
import { User } from "user/user.entity";

@Injectable()
export class FileService {
    constructor(
        @InjectQueue('file-processing') private readonly fileQueue: Queue,
        @InjectRepository(File) private readonly fileRepository: Repository<File>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async uploadFile(userId: number, file: Express.Multer.File, uploadFileDtodto: UploadFileDto) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user) {
            throw new NotFoundException('User not found');
        }

        const newFile = this.fileRepository.create({
            user,
            originalFilename: file.originalname,
            storagePath: file.path,
            title: uploadFileDtodto.title,
            description: uploadFileDtodto.description,
            status: FileStatus.UPLOADED
        });

        const savedFile = await this.fileRepository.save(newFile);

        await this.fileQueue.add('process-file', {
            fileId: savedFile.id,
        });

        const fileAgain = await this.fileRepository.findOne({ where: { id: savedFile.id } });

        return {
            fileId: savedFile.id,
            status: savedFile.status,
        }
    }

    async getFileById(id: number, userId: number) {
        const file = await this.fileRepository.findOne({ 
            where: {
                id,
                user: {
                    id: userId
                }
            }
        });

        if(!file) {
            throw new NotFoundException('File not found or access denied');
        }

        return file;
    }
}