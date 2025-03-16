import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn } from "typeorm"

@Entity()
export class TransactionMonobank extends BaseEntity {
    @PrimaryGeneratedColumn()
    transactionMonobankId: number

    @Column()
    operationDate: Date

    @Column()
    memo: string

    @Column()
    mcc: number

    @Column()
    amount: number

    @Column()
    operationAmount: number

    @Column()
    operationCurrency: number

    @Column()
    exchangeRate: number

    @Column()
    commissionAmount: number

    @Column()
    cashbackAmount: number

    @Column()
    balanceAfter: number

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}
