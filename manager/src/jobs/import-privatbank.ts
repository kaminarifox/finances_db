import { CronJob } from "cron"

export const importPrivatbankJob = CronJob.from({
    cronTime: '0 * * * * *',
    onTick: async function () {

    },
    waitForCompletion: true,
    timeZone: 'Europe/Kyiv'
});