import { Transform, Type } from "class-transformer";
import { DateTime } from "luxon";

export class MonobankExtraction {
    @Type(() => DateTime)
    @Transform(({ value }) => DateTime.fromFormat(value, 'dd.MM.yyyy HH:mm:ss').toJSDate())
    operationDate: Date;

    memo: string;

    mcc: string;

    amount: number;

    operationAmount?: number;

    operationCurrency?: string;

    exchangeRate?: number;

    commissionAmount?: number;

    cashbackAmount?: number;

    balanceAfter: number;
}