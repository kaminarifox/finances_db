import "reflect-metadata"
import { DataSource } from "typeorm"
import { TransactionMonobank } from "./entity/transaction_monobank"
import { SnakeNamingStrategy } from "./helpers/snake-naming-strategy"
import { ExtractionLog } from "./entity/extraction_log"
import { TransactionPrivatbank } from "./entity/transaction_privatbank"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgresql",
    port: 5432,
    username: "postgres",
    database: "finances",
    synchronize: false,
    logging: false,
    entities: [TransactionMonobank, TransactionPrivatbank, ExtractionLog],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})
