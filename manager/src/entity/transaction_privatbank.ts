import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Helpers } from "../helpers"


@Entity()
export class TransactionPrivatbank extends BaseEntity {
    @PrimaryGeneratedColumn({comment: 'ID'})
    transactionPrivatbankId: number

    @Column({comment: 'Дата і час операції'})
    operationDate: Date

    @Column({comment: 'Категорія'})
    category: string

    @Column({comment: 'Номер картки'})
    cardNumber: string

    @Column({comment: 'Опис операції'})
    memo: string

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Сума у валюті картки'})
    amount: number

    @Column({comment: 'Валюта картки'})
    currency: string

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Сума у валюті транзакції'})
    operationAmount: number

    @Column({ comment: 'Валюта транзакції'})
    operationCurrency: string

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Залишок на кінець періоду'})
    balanceAfter: number

    @Column({comment: 'Валюта залишку'})
    balanceCurrency: string

    @Column({comment: 'Контрольна сума транзакції', unique: true})
    checksum: string

    @CreateDateColumn({comment: 'Дата створення запису'})
    createdAt: Date

    @UpdateDateColumn({comment: 'Дата останнього оновлення запису'})
    updatedAt: Date

    @BeforeInsert()
    async setChecksum() {
        this.checksum = await Helpers.sha256sum(
            `${this.operationDate}_${this.category}_${this.amount}_${this.balanceAfter}`,
            false
        )
    }
}
