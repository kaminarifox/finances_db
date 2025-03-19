import { AppDataSource } from "./data-source"
import { importMonobankJob, importPrivatbankJob } from "./jobs";



AppDataSource.initialize().then(async () => {
    importMonobankJob.start()
    importPrivatbankJob.start()

}).catch(error => console.log(error))
