import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, UpdateDateColumn, CreateDateColumn, BeforeInsert } from "typeorm"
import { Helpers } from "../helpers"

@Entity()
export class TransactionMonobank extends BaseEntity {
    @PrimaryGeneratedColumn({comment: 'ID'})
    transactionMonobankId: number

    @Column({comment: 'Дата і час операції'})
    operationDate: Date

    @Column({comment: 'Деталі операції'})
    memo: string

    @Column({comment: 'Merchant Category Code (MCC) – код категорії продавця'})
    mcc: string

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Сума в валюті картки (UAH)'})
    amount: number

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Сума в валюті операції'})
    operationAmount: number

    @Column({comment: 'Валюта операції (наприклад, USD, EUR)'})
    operationCurrency: string

    @Column({type: 'decimal', precision: 16, scale: 4, nullable: true, comment: 'Курс обміну для конвертації у валюту картки'})
    exchangeRate?: number

    @Column({type: 'decimal', precision: 16, scale: 4, nullable: true, comment: 'Сума комісій (UAH)'})
    commissionAmount: number

    @Column({type: 'decimal', precision: 16, scale: 4, nullable: true, comment: 'Сума кешбеку (UAH)'})
    cashbackAmount: number

    @Column({type: 'decimal', precision: 16, scale: 4, comment: 'Залишок після операції (UAH)'})
    balanceAfter: number

    @Column({comment: 'Контрольна сума транзакції', unique: true})
    checksum: string

    @CreateDateColumn({comment: 'Дата створення запису'})
    createdAt: Date

    @UpdateDateColumn({comment: 'Дата останнього оновлення запису'})
    updatedAt: Date

    @BeforeInsert()
    async setChecksum() {
        this.checksum = await Helpers.sha256sum(
            `${this.operationDate.getDate()}_${this.mcc}_${this.amount}_${this.balanceAfter}`,
            false
        )
    }
}
