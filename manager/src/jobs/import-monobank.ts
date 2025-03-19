import { CronJob } from "cron"
import { parse, parseFile } from '@fast-csv/parse';
import { TransactionMonobank } from "../entity/transaction_monobank";
import { ExtractionsExplorer } from "../helpers/extractions-explorer";
import { AppDataSource } from "../data-source";
import { ExtractionLog } from "../entity/extraction_log";
import { DateTime } from "luxon";
import { plainToInstance } from "class-transformer";
import { MonobankExtraction } from "../models/monobak-extraction";
import { error } from "console";

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

const parseCsv = (path: string) => new Promise((resolve, reject) => {
    const entities: TransactionMonobank[] = []
    parseFile(path, { headers, renameHeaders: true })
        .transform(row => {
            Object.keys(row).forEach(key => {
                row[key] = row[key] === '—' ? null : row[key]
            })
            return plainToInstance(MonobankExtraction, row)
        })
        .on('error', error => { reject(error) })
        .on('data', row => {
            entities.push(TransactionMonobank.create(row))
        })
        .on('end', (rowCount: number) => {
            resolve(entities)
        });
})


const job = async () => {
    const files = await ExtractionsExplorer.listExtractions('monobank')
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

export const importMonobankJob = CronJob.from({
    cronTime: '30 * * * * *',
    onTick: job,
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});