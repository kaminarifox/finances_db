import { AppDataSource } from "./data-source"
import { importMonobankJob } from "./jobs";



AppDataSource.initialize().then(async () => {
    importMonobankJob.start()

}).catch(error => console.log(error))
