import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { sha256sum } from "../helpers/sha256sum"

@Entity()
export class TransactionPrivatbank extends BaseEntity {
    @PrimaryGeneratedColumn()
    transactionPrivatbankId: number

    @Column()
    operationDate: Date

    @Column()
    category: string

    @Column()
    cardNumber: string

    @Column()
    memo: string

    @Column()
    amount: number

    @Column()
    currency: string

    @Column()
    operationAmount: number

    @Column()
    operationCurrency: string

    @Column()
    balanceAfter: number

    @Column()
    balanceCurrency: string

    @Column()
    checksum: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async setChecksum() {
        this.checksum = await sha256sum(
            `${this.operationDate.getDate()}_${this.category}_${this.amount}_${this.balanceAfter}`,
            false
        )
    }
}