import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class ExtractionLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    extractionLogId: number

    @Column()
    filename: string;

    @Column()
    sha256sum: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}