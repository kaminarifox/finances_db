import { CronJob } from "cron"
import { AppDataSource } from "../data-source";
import { ExtractionLog } from "../entity/extraction_log";
import { TransactionPrivatbank } from "../entity/transaction_privatbank";
import { plainToInstance } from "class-transformer";
import { Helpers } from "../helpers";
import * as XLSX from 'xlsx'
import { DateTime } from "luxon";

const header = [
    'operationDate',
    'category',
    'cardNumber',
    'memo',
    'amount',
    'currency',
    'operationAmount',
    'operationCurrency',
    'balanceAfter',
    'balanceCurrency'
]

const job = async () => {
    const files = await Helpers.listExtractions('privatbank', 'xlsx')
    for (const { path, checksum } of files) {
        console.log(`Processing ${path} : ${checksum}`)
        if (await ExtractionLog.countBy({ checksum })) {
            console.log(`Skipping ${path} : ${checksum}`)
            continue
        };

        const workbook = XLSX.readFile(path)
        const entities = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { header, range: 2 }).map((row) => {
            row['operationDate'] = DateTime.fromFormat(row['operationDate'], 'dd.mm.yyyy TT').toJSDate()
            return plainToInstance(TransactionPrivatbank, row)
        })

        await AppDataSource.manager.save(entities).catch(error => {
            console.error(error)
        })

        const fileLog = ExtractionLog.create({ path, checksum })
        await fileLog.save()
    }
}

export const importPrivatbankJob = CronJob.from({
    cronTime: '30 * * * * *',
    onTick: job,
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});