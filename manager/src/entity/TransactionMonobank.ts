import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class TransactionMonobank extends BaseEntity {

    @PrimaryGeneratedColumn()
    transaction_monobank_id: number


}
