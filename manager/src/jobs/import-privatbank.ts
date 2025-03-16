import { CronJob } from "cron"
import { parse } from '@fast-csv/parse';
import { TransactionMonobank } from "../entity/TransactionMonobank";

export const importPrivatbankJob = CronJob.from({})