import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class File {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    originalName: string;

    @Column()
    filename: string;

    @Column()
    path: string;

    @Column()
    status: string;

    @CreateDateColumn()
    uploadedAt: string;
}