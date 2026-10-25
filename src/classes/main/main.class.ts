import type { Engine } from "../../abs-classes/engine/engine.class.js";
import express from "express"
import http, { Server } from "http"
import { Logger } from "../logger/logger.class.js";
import { config } from "dotenv"
import { ServerEnvValidator } from "../../functions/server-env-validator.func.js";

config()

export class MainEngine {
    private engines: Engine[] = []

    private declare APP: any; 

    private Server: Server

    private logger = new Logger("Server")

    constructor() {
        this.APP = express()

        this.Server = http.createServer(this.APP)
    }

    injectEngine = (engine: Engine) => this.engines.push(engine)
    
    private async InitializeAllEngines () {
        for (const engine of this.engines) {

            const {name} = engine

            try {
                this.logger.log(`Initializing [${name}] Engine..`)
                
                await engine.Initialize(this.APP, this.Server)

                this.logger.log(`[${name}] Engine has been initialized successfully`, 'success')
            } catch (error: any) {
                
                this.logger.log(`[${name}] Engine has exitted with an error: "${error.message}", Server has been haulted`, 'error')
                
                break
            }
        }
    }

    Start (cb?: () => void) {
        this.logger.log("Validating server enviroment variables")

        ServerEnvValidator()

        this.logger.log("Server enviroment variables validated", "success")

        const {SERVER_PORT} = process.env

        this.logger.log("Starting server..")

        this.InitializeAllEngines()

        .then(() => {
            this.Server.listen(SERVER_PORT, () => {

                this.logger.log(`Server is listening on ${SERVER_PORT}`, "success")

                if(cb) cb()
            })
        })
    }
}