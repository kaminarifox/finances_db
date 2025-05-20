import "reflect-metadata"
import { DataSource } from "typeorm"
import { TransactionMonobank } from "./entity/transaction_monobank"
import { ExtractionLog } from "./entity/extraction_log"
import { TransactionPrivatbank } from "./entity/transaction_privatbank"
import { DatabaseNamingStrategy } from "./database-naming-strategy"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgresql",
    port: 5432,
    username: "postgres",
    database: "finances",
    synchronize: true,
    logging: false,
    entities: [TransactionMonobank, TransactionPrivatbank, ExtractionLog],
    migrations: [],
    subscribers: [],
    namingStrategy: new DatabaseNamingStrategy(),
})