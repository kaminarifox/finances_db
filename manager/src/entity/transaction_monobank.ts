import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, BeforeInsert } from "typeorm"
import { sha256sum } from "../helpers/sha256sum"

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

    @Column()
    checksum: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @BeforeInsert()
    async setChecksum() {
        this.checksum = await sha256sum(
            `${this.operationDate.getDate()}_${this.mcc}_${this.amount}_${this.balanceAfter}`,
            false
        )
    }
}
