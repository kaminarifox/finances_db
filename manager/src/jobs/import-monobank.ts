export const importMonobankJob = CronJob.from({
    cronTime: '0 * * * * *',
    onTick: async function () {
        const stream = parse({ headers: true })
            .on('error', error => console.error(error))
            .on('data', row => console.log(row))
            .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

        stream.write(CSV_STRING);
        stream.end();


        const data = await TransactionMonobank.find()
        console.log(data)
    },
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});