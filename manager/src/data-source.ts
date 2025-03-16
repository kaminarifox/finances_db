import "reflect-metadata"
import { DataSource } from "typeorm"
import { TransactionMonobank } from "./entity/transaction_monobank"
import { SnakeNamingStrategy } from "./helpers/snake-naming-strategy"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "postgresql",
    port: 5432,
    username: "postgres",
    database: "finances",
    synchronize: false,
    logging: false,
    entities: [TransactionMonobank],
    migrations: [],
    subscribers: [],
    namingStrategy: new SnakeNamingStrategy(),
})
