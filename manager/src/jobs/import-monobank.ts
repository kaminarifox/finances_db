import { CronJob } from "cron"
import { AppDataSource } from "../data-source";
import { ExtractionLog } from "../entity/extraction_log";
import { TransactionMonobank } from "../entity/transaction_monobank";
import { plainToInstance } from "class-transformer";
import { Helpers } from "../helpers";
import { DateTime } from "luxon";

const headers = [
    'operationDate',
    'memo',
    'mcc',
    'amount',
    'operationAmount',
    'operationCurrency',
    'exchangeRate',
    'commissionAmount',
    'cashbackAmount',
    'balanceAfter'
]

const job = async () => {
    const files = await Helpers.listExtractions('monobank')
    for (const { path, checksum } of files) {
        console.log(`Processing ${path} : ${checksum}`)
        if (await ExtractionLog.countBy({ checksum })) {
            console.log(`Skipping ${path} : ${checksum}`)
            continue
        };

        const entities = await Helpers.parseCsv(path, headers, '—').then(items => items.map(row => {
            row['operationDate'] = DateTime.fromFormat(row['operationDate'] as string, 'dd.mm.yyyy TT').toJSDate()
            return plainToInstance(TransactionMonobank, row)
        }))

        await AppDataSource.manager.save(entities).catch(error => {
            console.error(error)
        })

        const fileLog = ExtractionLog.create({ path, checksum })
        await fileLog.save()
    }
}

export const importMonobankJob = CronJob.from({
    cronTime: '0 * * * * *',
    onTick: job,
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});