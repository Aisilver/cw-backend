import { config } from "dotenv"
import { Db, MongoClient } from "mongodb"

config()

class DatabaseManager {
    private declare mongo: MongoClient

    private declare database: Db
    
    get DB () {
        return this.database
    }
    
    async Initialize () {
        const {MONGO_URL, DATABASE} = process.env

        this.mongo = new MongoClient(MONGO_URL)

        await this.mongo.connect()

        this.database = this.mongo.db(DATABASE)
    }
}

export const _DatabaseManger = new DatabaseManager()