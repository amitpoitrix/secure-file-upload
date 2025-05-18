import { Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { JwtAuthGuard } from "auth/jwt-auth.guard";

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FileController {
    constructor( private readonly fileService: FileService ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
        })
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileService.savefile(file);
    }

    @Get(':id/status')
    async getStatus(@Param('id') id: number) {
        return this.fileService.getFileStatus(id);
    }
}