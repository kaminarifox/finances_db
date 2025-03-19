import { CronJob } from "cron"
import { parseFile } from '@fast-csv/parse';
import { ExtractionsExplorer } from "../helpers/extractions-explorer";
import { AppDataSource } from "../data-source";
import { ExtractionLog } from "../entity/extraction_log";
import { plainToInstance } from "class-transformer";
import { TransactionPrivatbank } from "../entity/transaction_privatbank";
import { PrivatbankExtraction } from "../models/privatbank-extraction";

const headers = [
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

const parseCsv = (path: string) => new Promise((resolve, reject) => {
    const entities: TransactionPrivatbank[] = []
    parseFile(path, { headers, renameHeaders: true, skipLines: 2 })
        .transform(row => {
            Object.keys(row).forEach(key => {
                row[key] = row[key] == '' ? null : row[key]
            })
            return plainToInstance(PrivatbankExtraction, row)
        })
        .on('error', error => { reject(error) })
        .on('data', row => {
            entities.push(TransactionPrivatbank.create(row))
        })
        .on('end', (rowCount: number) => {
            resolve(entities)
        });
})


const job = async () => {
    const files = await ExtractionsExplorer.listExtractions('privatbank')
    for (const { path, checksum } of files) {
        console.log(`Processing ${path} : ${checksum}`)
        if (await ExtractionLog.countBy({ checksum })) {
            console.log(`Skipping ${path} : ${checksum}`)
            continue
        };

        const entities = await parseCsv(path)
        await AppDataSource.manager.save(entities).catch(error => {
            console.error(error)
        })

        const fileLog = ExtractionLog.create({ path, checksum })
        await fileLog.save()
    }
}

export const importPrivatbankJob = CronJob.from({
    cronTime: '0 * * * * *',
    onTick: job,
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});