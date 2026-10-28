import type { Engine } from "../../abs-classes/engine/engine.class.js";
import express from "express"
import http, { Server } from "http"
import { Logger } from "../logger/logger.class.js";
import { config } from "dotenv"

config()

export class MainEngine {
    private engines: Engine[] = []

    private declare APP: any; 

    private Server: Server

    private logger = new Logger("MainServerEngine")

    private declare errMessage: string

    constructor() {
        this.APP = express()

        this.Server = http.createServer(this.APP)
    }

    injectEngine = (engine: Engine) => this.engines.push(engine)
    
    async InitializeAllEngines () {
        for (const engine of this.engines) {

            const {name} = engine

            try {
                this.logger.log(`Initializing [${name}] Engine..`)
                
                await engine.Initialize(this.APP, this.Server)

                this.logger.log(`[${name}] Engine has been initialized successfully`, 'success')
            } catch (error: any) {
                
                this.errMessage = `[${name}] Engine has exitted with an error: "${error.message}", Server has been haulted`
                
                throw error
            }
        }
    }

    LogError() {
        this.logger.log(this.errMessage, 'error')
    }

    Start (cb?: () => void) {
        const {SERVER_PORT} = process.env

        this.logger.log("Starting server..")

        this.Server.listen(SERVER_PORT, () => {

            this.logger.log(`Server is listening on ${SERVER_PORT}`, "success")

            if(cb) cb()
        })
    }  
}