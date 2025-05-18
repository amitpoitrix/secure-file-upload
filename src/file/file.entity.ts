import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { FileStatus } from "./file.dto";

@Entity('files')
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToMany(() => User, (user) => user.files, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ name: 'original_filename' })
    originalFilename: string;

    @Column({ 
        name: 'storage_path', 
        type: 'text' 
    })
    storagePath: string;

    @Column({ 
        type: 'varchar', 
        length: 255, 
        nullable: true 
    })
    title?: string;

    @Column({ 
        type: 'text', 
        nullable: true 
    })
    description?: string;

    @Column({
        type: 'varchar',
        length: 50,
        default: FileStatus.UPLOADED,
    })
    status: FileStatus;

    @Column({
        name: 'extracted_data',
        type: 'text',
        nullable: true,
    })
    extractedData?: string;

    @CreateDateColumn({ name: 'uploaded_at' })
    uploadedAt: Date;
}