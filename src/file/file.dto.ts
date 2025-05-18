import { IsOptional, IsString } from "class-validator";

export enum FileStatus {
    UPLOADED = 'uploaded',
    PROCESSING = 'processing',
    PROCESSED = 'processed',
    FAILED = 'failed',
}

export class UploadFileDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}