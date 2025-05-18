import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { File } from "./file.entity";
import { Repository } from "typeorm";
import { Status } from "./file.dto";

@Injectable()
export class FileService {
    constructor(@InjectRepository(File) private fileRepo: Repository<File>) {}

    async savefile(file: Express.Multer.File) {
        const newFile = this.fileRepo.create({
            originalName: file.originalname,
            filename: file.filename,
            path: file.path,
            status: Status.PENDING,
        });

        const saved = await this.fileRepo.save(newFile);

        /** Simulating background process for 5 sec */
        setTimeout(async () => {
            saved.status = Status.COMPLETED;
            await this.fileRepo.save(saved);
        }, 15000);

        return saved;
    }

    async getFileStatus(id: number) {
        const file = await this.fileRepo.findOneBy({ id });
        return {
            status: file?.status || Status.NOT_FOUND
        }
    }
}