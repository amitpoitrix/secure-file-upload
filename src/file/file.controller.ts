import { Body, Controller, Get, Param, ParseIntPipe, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileService } from "./file.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from 'multer';
import { JwtAuthGuard } from "auth/jwt-auth.guard";
import { UploadFileDto } from "./file.dto";

@Controller()
@UseGuards(JwtAuthGuard)
export class FileController {
    constructor( private readonly fileService: FileService ) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, cb) => { 
                    cb(null,`${Date.now()}-${file.originalname}`);
                }
            }),
            limits: {
                /** Max file size limit 5 MB */
                fileSize: 5 * 1024 * 1024, 
            }
        })
    )
    async uploadFile(
        @UploadedFile() file: Express.Multer.File,
        @Body() uploadFileDto: UploadFileDto,
        @Request() req,
    ) {
        const userId = req.user.userId;
        return this.fileService.uploadFile(userId, file, uploadFileDto);
    }

    @Get('files/:id')
    async getFileById(
        @Param('id', ParseIntPipe) id: number,
        @Request() req,
    ) {
        const userId = req.user.userId;
        return this.fileService.getFileById(id, userId);
    }
}