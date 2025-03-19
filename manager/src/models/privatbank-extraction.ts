import { Transform, Type } from "class-transformer";
import { DateTime } from "luxon";

export class PrivatbankExtraction {
    @Type(() => DateTime)
    @Transform(({ value }) => DateTime.fromFormat(value, 'dd.MM.yyyy HH:mm:ss').toJSDate())
    operationDate: Date;

    category: string;
    cardNumber: string;
    memo: string;
    amount: number;
    currency: string;
    operationAmount: number;
    operationCurrency: string;
    balanceAfter: number;
    balanceCurrency: string;
}