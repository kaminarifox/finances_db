import { CronJob } from "cron"
import { parse, parseFile } from '@fast-csv/parse';
import { TransactionMonobank } from "../entity/transaction_monobank";
import { ExtractionsExplorer } from "../helpers/extractions-explorer";

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
    parseFile(path, { headers })
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
    for (const { path, sha256sum } of files) {
        const entities = await parseCsv(path)
        console.log(entities);
        // await TransactionMonobank.save(entities)
    }
}

export const importMonobankJob = CronJob.from({
    cronTime: '0 * * * * *',
    onTick: job,
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});