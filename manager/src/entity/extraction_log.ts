import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ExtractionLog extends BaseEntity {
    @PrimaryGeneratedColumn()
    extractionLogId: number

    @Column()
    path: string;

    @Column()
    checksum: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}